import { useGlobal } from '@/lib/global'
import Card from './Card'

/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return (
    <Card className='w-full'>
      <div className='flex flex-wrap md:p-4 p-3 min-h-[20vh] items-center justify-center'>
        <p className='text-gray-500 dark:text-gray-300 w-full text-center'>
          {locale.COMMON.NO_RESULTS_FOUND} {currentSearch && <div>{currentSearch}</div>}
        </p>
      </div>
    </Card>
  )
}

export default BlogPostListEmpty
