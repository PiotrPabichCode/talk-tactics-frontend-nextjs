import {
  assignCourseToUser,
  learnCourseParticipantWord,
  removeUserFromCourse,
} from '@/services/api/course.service';
import {
  ApiRequestAssignCourseToUser,
  ApiRequestRemoveUserFromCourse,
} from '@/typings/course';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  COURSE_PARTICIPANT_WORDS_PREVIEW_QUERY_KEY,
  COURSE_PARTICIPANTS_PREVIEW_QUERY_KEY,
} from './course.query';

export function useAssignCourseToUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ApiRequestAssignCourseToUser) => {
      await assignCourseToUser(req);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [COURSE_PARTICIPANTS_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: ['assignUserToCourse'],
  });
}

export function useRemoveUserFromCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ApiRequestRemoveUserFromCourse) => {
      await removeUserFromCourse(req);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [COURSE_PARTICIPANTS_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: ['removeUserFromCourse'],
  });
}

export function useLearnCourseParticipantWord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid: string) => {
      return await learnCourseParticipantWord(uuid);
    },
    onSuccess({ courseUuid }) {
      queryClient.invalidateQueries({
        queryKey: [COURSE_PARTICIPANT_WORDS_PREVIEW_QUERY_KEY, courseUuid],
      });
      queryClient.invalidateQueries({
        queryKey: [COURSE_PARTICIPANTS_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: ['learnCourseParticipantWord'],
  });
}
