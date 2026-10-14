import { Profile, ProfileInput } from "@/data/profile";
import { File, Paths } from "expo-file-system";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type ProfileContextData = {
    profile: Profile;
    updateProfile: (profile: ProfileInput) => Promise<void>;
    updateAvatar: (pickedUri: string) => Promise<void>;
    removeAvatar: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextData | null>(null);

// Apaga a foto antiga da pasta do app, se ela ainda existir.
function deleteAvatarFile(uri: string) {
    if (!uri) {
        return;
    }

    const file = new File(uri);

    if (file.exists) {
        file.delete();
    }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const [profile, setProfile] = useState<Profile>();

    const fetchProfile = useCallback(async () => {
        const row = await db.getFirstAsync<Profile>(
            "SELECT name, course, semester, avatar_uri AS avatarUri FROM profile WHERE id = 1"
        );

        return row ?? undefined;
    }, [db]);

    useEffect(() => {
        fetchProfile().then(setProfile);
    }, [fetchProfile]);

    async function updateProfile(input: ProfileInput) {
        await db.runAsync(
            "UPDATE profile SET name = ?, course = ?, semester = ? WHERE id = 1",
            input.name,
            input.course,
            input.semester
        );
        setProfile(await fetchProfile());
    }

    // A foto do seletor fica no cache, que o sistema pode limpar, então é copiada para a pasta do app.
    // O nome muda a cada troca para o Image não mostrar a foto anterior guardada em cache.
    async function updateAvatar(pickedUri: string) {
        const picked = new File(pickedUri);
        const avatar = new File(Paths.document, `avatar-${Date.now()}${picked.extension || ".jpg"}`);
        await picked.copy(avatar);

        await db.runAsync("UPDATE profile SET avatar_uri = ? WHERE id = 1", avatar.uri);
        deleteAvatarFile(profile?.avatarUri ?? "");
        setProfile(await fetchProfile());
    }

    async function removeAvatar() {
        await db.runAsync("UPDATE profile SET avatar_uri = '' WHERE id = 1");
        deleteAvatarFile(profile?.avatarUri ?? "");
        setProfile(await fetchProfile());
    }

    if (!profile) {
        return null;
    }

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, updateAvatar, removeAvatar }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("useProfile precisa ser usado dentro de ProfileProvider.");
    }

    return context;
}
