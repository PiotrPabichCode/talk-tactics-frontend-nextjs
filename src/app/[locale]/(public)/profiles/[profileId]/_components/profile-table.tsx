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
import { LocalizeCourseLevel, UserCourse } from '@/typings/course';

const ProfileTable = ({ courses }: { courses: UserCourse[] }) => {
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
              key={courseDetails.id}
              className='cursor-pointer hover:text-blue-500'
              onClick={() =>
                router.push(`/courses/${courseDetails.course.id}`)
              }>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.id}`}>
                  {courseDetails.course.title}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/courses/${courseDetails.course.id}`}>
                  {LocalizeCourseLevel(courseDetails.course.level)}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.id}`}>
                  {courseDetails.progress}%
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/courses/${courseDetails.course.id}`}>
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
