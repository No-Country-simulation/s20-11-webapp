import { useFormAction, useNavigation } from "react-router";

export function useIsPending({
  formAction,
  formMethod = "POST",
  state = "non-idle",
} = {}) {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();
  const isPendingState =
    state === "non-idle"
      ? navigation.state !== "idle"
      : navigation.state === state;
  return (
    isPendingState &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod
  );
}
