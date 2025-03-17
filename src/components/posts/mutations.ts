import { useMutation } from "@tanstack/react-query";
import { deletePost } from "./actions";
import { toast } from "sonner";

export function useDeleteMutation() {
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {},
    onError: () => {
      toast("Cannot delete post. Please try again...");
    },
  });

  return mutation;
}
