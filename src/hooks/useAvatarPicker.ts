import { useProfile } from "@/contexts/ProfileContext";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
};

// Menu da foto de perfil: tirar foto, escolher da galeria ou voltar para a foto padrão.
export function useAvatarPicker() {
    const { profile, updateAvatar, removeAvatar } = useProfile();

    async function saveResult(result: ImagePicker.ImagePickerResult) {
        if (result.canceled) {
            return;
        }

        try {
            await updateAvatar(result.assets[0].uri);
        } catch {
            Alert.alert("Foto de perfil", "Não foi possível salvar a foto. Tente novamente.");
        }
    }

    async function takePhoto() {
        // A câmera sempre pede permissão; a galeria não precisa.
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Câmera", "Permita o acesso à câmera nas configurações do aparelho para tirar a foto.");
            return;
        }

        saveResult(await ImagePicker.launchCameraAsync(PICKER_OPTIONS));
    }

    async function pickFromLibrary() {
        saveResult(await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS));
    }

    function confirmRemove() {
        Alert.alert("Remover foto", "Deseja voltar para a foto padrão?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Remover", style: "destructive", onPress: removeAvatar },
        ]);
    }

    function openAvatarMenu() {
        const removeOption = profile.avatarUri
            ? [{ text: "Remover foto", style: "destructive" as const, onPress: confirmRemove }]
            : [];

        Alert.alert("Foto de perfil", undefined, [
            { text: "Tirar foto", onPress: takePhoto },
            { text: "Escolher da galeria", onPress: pickFromLibrary },
            ...removeOption,
            { text: "Cancelar", style: "cancel" },
        ]);
    }

    return { openAvatarMenu };
}
