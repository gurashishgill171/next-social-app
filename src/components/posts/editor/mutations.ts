import { useMutation } from "@tanstack/react-query";
import { submitPost } from "./action";
import { toast } from "sonner";

export function useSubmitMutation() {
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: () => {},
    onError: () => {
      toast("Post creation failed. Please try again...");
    },
  });

  return mutation;
}
