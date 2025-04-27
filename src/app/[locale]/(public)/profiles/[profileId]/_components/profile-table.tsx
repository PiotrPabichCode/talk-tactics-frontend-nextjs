import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from '@/i18n';
import { Link, useRouter } from '@/navigation';
import { LocalizeCourseLevel, CourseParticipant } from '@/typings/course';

const ProfileTable = ({ courses }: { courses: CourseParticipant[] }) => {
  const t = useTranslations('ProfilePage');
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('course')}</TableHead>
          <TableHead>{t('level')}</TableHead>
          <TableHead>{t('progress')}</TableHead>
          <TableHead>{t('points')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((courseDetails) => {
          return (
            <TableRow
              key={courseDetails.uuid}
              className='cursor-pointer hover:text-blue-500'
              onClick={() =>
                router.push(`/courses/${courseDetails.course.uuid}`)
              }>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.uuid}`}>
                  {courseDetails.course.title}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/courses/${courseDetails.course.uuid}`}>
                  {LocalizeCourseLevel(courseDetails.course.level)}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.uuid}`}>
                  {courseDetails.progress}%
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.uuid}`}>
                  {courseDetails.points}
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProfileTable;
