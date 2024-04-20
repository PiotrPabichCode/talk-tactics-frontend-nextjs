import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getUserProfiles, updateUser } from '../api/user.service';
import { ApiRequestUpdateUser, IUserProfile } from '@/typings/user';

const UPDATE_USER_DETAILS_MUTATION_KEY = 'updateUserDetails';
const GET_USER_PROFILES_QUERY_KEY = 'getUserProfiles';

export const useUpdateUserDetailsMutation = () => {
  return useMutation({
    mutationFn: async ({ id, updatedFields }: ApiRequestUpdateUser) => {
      const res = await updateUser({ id, updatedFields });
      return res;
    },
    mutationKey: [UPDATE_USER_DETAILS_MUTATION_KEY],
  });
};

export const useGetUserProfiles = (): UseQueryResult<IUserProfile[]> => {
  const queryClient = useQueryClient();
  const query = useQuery<IUserProfile[]>({
    queryKey: [GET_USER_PROFILES_QUERY_KEY],
    queryFn: async () => {
      return await getUserProfiles();
    },
    initialData: () => {
      return queryClient.getQueryData<IUserProfile[]>([
        GET_USER_PROFILES_QUERY_KEY,
      ]);
    },
  });
  return query;
};
