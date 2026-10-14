import { ImageSourcePropType } from "react-native";

export type Profile = {
    name: string;
    course: string;
    semester: string;
    // Caminho da foto escolhida pelo estudante; vazio usa a foto padrão.
    avatarUri: string;
};

// Dados que o formulário de perfil envia para o banco.
export type ProfileInput = Omit<Profile, "avatarUri">;

const DEFAULT_AVATARS = {
    small: require("@/assets/images/avatar.jpg"),
    large: require("@/assets/images/avatar-large.jpg"),
};

export function getAvatarSource(profile: Profile, size: keyof typeof DEFAULT_AVATARS): ImageSourcePropType {
    return profile.avatarUri ? { uri: profile.avatarUri } : DEFAULT_AVATARS[size];
}
