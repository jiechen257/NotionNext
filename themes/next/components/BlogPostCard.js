import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import CONFIG from '../config'
import Card from './Card'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ post, index, showSummary }) => {
  const { locale } = useGlobal()
  const showPreview =
    siteConfig('NEXT_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // 动画样式  首屏卡片不用，后面翻出来的加动画
  const aosProps =
    index > 2
      ? {
          'data-aos': 'fade-down',
          'data-aos-duration': '400',
          'data-aos-once': 'true',
          'data-aos-anchor-placement': 'top-bottom'
        }
      : {}

  return (
    <Card className='w-full'>
      <div
        key={post.id}
        className='flex flex-row justify-between duration-300 md:gap-6 gap-3 max-h-[200px]'>
        <div className='md:p-4 px-3 flex flex-col w-full'>
          {/* 文章标题 */}
          <Link
            {...aosProps}
            href={post?.href}
            passHref
            className='cursor-pointer text-2xl leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}{' '}
            <span className='menu-link'>{post.title}</span>
          </Link>

          <div
            {...aosProps}
            className='flex mt-2 mb-3 items-center justify-start flex-wrap dark:text-gray-500 text-gray-500'>
            <div>
              {post.category && (
                <>
                  <Link
                    href={`/category/${post.category}`}
                    passHref
                    className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer font-light text-sm transform'>
                    <i className='mr-1 fas fa-folder' />
                    <span className='menu-link'>{post.category}</span>
                  </Link>
                  <span className='mx-2'>|</span>
                </>
              )}
              <Link
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                passHref
                className='hover:text-blue-500 dark:hover:text-blue-400 font-light cursor-pointer text-sm leading-4 mr-3'>
                <span className='menu-link'>{post.date?.start_date}</span>
              </Link>
            </div>

            <TwikooCommentCount
              post={post}
              className='hover:text-blue-500 dark:hover:text-blue-400 hover:underline text-sm'
            />

            <div className='hover:text-blue-500 dark:hover:text-blue-400  md:flex-nowrap flex-wrap md:justify-start inline-block'>
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>

          {(!showPreview || showSummary) && !post.results && (
            <p
              {...aosProps}
              className='mt-2 md:mb-6 mb-2 text-gray-700 dark:text-gray-300 text-sm font-light leading-6'>
              {post.summary}
            </p>
          )}

          {/* 搜索结果 */}
          {post.results && (
            <p className='line-clamp-4 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
              {post.results.map((r, index) => (
                <span key={index}>{r}</span>
              ))}
            </p>
          )}

          {showPreview && post?.blockMap && (
            <div className='overflow-ellipsis truncate'>
              <NotionPage post={post} />
            </div>
          )}

          {/* 详情按钮 */}
          <div className='text-left mt-auto flex md:justify-start justify-end'>
            <Link
              href={post?.href}
              className='inline-block px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 transition-colors rounded'>
              {locale.COMMON.ARTICLE_DETAIL}
              <i className='ml-1 fas fa-angle-right' />
            </Link>
          </div>
        </div>

        {siteConfig('NEXT_POST_LIST_COVER', null, CONFIG) &&
          post?.pageCoverThumbnail && (
            <Link href={post?.href} passHref legacyBehavior>
              <div className='hidden md:flex w-64 items-center justify-center relative duration-200 cursor-pointer overflow-hidden flex-shrink-0 md:ml-2'>
                <Image
                  className='hover:scale-105 transform duration-500'
                  src={post?.pageCoverThumbnail}
                  alt={post.title}
                  width={256}
                  height={256}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Link>
          )}
      </div>
    </Card>
  )
}

export default BlogPostCard
