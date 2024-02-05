import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { useBlogContext } from '../../services/ContextProvider'
import { PostResponse } from '../../types/Post'
import { formattedDate } from '../../utils/formatter'
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormBlogPost } from '../../components/FormBlogPost'
import { FabBlogPost } from '../../components/FabBlogPost'

export default function BlogDetail() {
  const [post, setPost] = useState<PostResponse>()
  const [updatePost, setUpdatePost] = useState({})
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const { deleteBlog, getBlog, updateBlog } = useBlogContext();
  const { imgUrl, title, content, createdAt } = post || {}
  const pathname = useSearchParams()
  const router = useRouter();
  const index = pathname.get('index') || ''
  const blogIndex = parseInt(index)

  const imageDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqgRAb49-QsVJpeNhEzlwDb5nxh7u8M9t-Q&usqp=CAU'
  const image = imgUrl ? imgUrl : imageDefault

  const getBlogInfo = () => {
    const post = getBlog(blogIndex)
    setPost(post)
  }

  const handleAction = (action?: string) => {
    if (action === 'delete') {
      deleteBlog(blogIndex)
      return router.push({ pathname: '/list' })
    }

    if (action === 'save') {
      const edited = { ...post, ...updatePost }
      updateBlog(blogIndex, edited)
      getBlogInfo()
    }

    setOpen(false);
  };

  const handleOpen = (action: string) => {
    setOpen(true);
    setAction(action)
  }

  const handleChange = (key: string, value: string) => {
    setUpdatePost({ ...updatePost, [key]: value })
  }

  useEffect(() => {
    getBlogInfo()
  },[router.isReady]);

  return (
    <Container>
      <Stack alignItems='center' sx={{backgroundColor: 'primary.light', flexDirection: { sm: 'column', md: 'row' }}} marginTop='48px'>
        <Stack width='80%' alignItems='center' p={2}>
          <CardMedia sx={{ objectFit: 'cover' }} component="img" image={image} alt="image blog"></CardMedia>
          <Typography marginTop='12px' fontWeight='500' textAlign='center'>{formattedDate(createdAt || '')}</Typography>
        </Stack>
        <Stack width='100%' p={2}>
          <Typography gutterBottom textAlign='center' variant='h6'>{title}</Typography>
          <Typography marginTop='16px' textAlign='center'>{content}</Typography>
        </Stack>
      </Stack>
      <FormBlogPost post={post} action={action} open={open} handleAction={handleAction} handleChange={handleChange}></FormBlogPost>
      <FabBlogPost handleOpen={handleOpen}></FabBlogPost>
    </Container>
  );
};
