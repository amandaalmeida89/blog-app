import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useBlogContext } from '../../services/ContextProvider';
import { PostResponse } from '../../types/Post';
import { formattedDate } from '../../utils/formatter';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormBlogPost } from '../../components/FormBlogPost';
import { FabBlogPost } from '../../components/FabBlogPost';

export default function BlogDetail() {
  const [post, setPost] = useState<PostResponse>();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const { deletePost, getPost, updatePost } = useBlogContext();
  const { imgUrl, title, content, createdAt } = post || {};
  const pathname = useSearchParams();
  const router = useRouter();
  const id = pathname.get('post') || '';
  const postId = parseInt(id);

  const imageDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqgRAb49-QsVJpeNhEzlwDb5nxh7u8M9t-Q&usqp=CAU';
  const image = imgUrl ? imgUrl : imageDefault;

  const fabAction = [
    {
      type: 'edit',
      icon: <EditIcon />,
      mt: '8px'
    },
    {
      type: 'delete',
      icon: <DeleteIcon />
    },
  ]

  const getPostInfo = useCallback(() => {
    const post = getPost(postId);
    setPost(post);
  }, [postId, getPost]);

  const handleAction = (action?: string) => {
    if (action === 'delete') {
      deletePost(postId);
      return router.push({ pathname: '/list' });
    }

    if (action === 'save' && post) {
      if (post.title && post.content) {
        updatePost(postId, post);
        getPostInfo();
      }
    }

    setOpen(false);
  };

  const handleOpen = (action: string) => {
    setOpen(true);
    setAction(action);
  };

  const handleChange = (key: string, value: string) => {
    if (post) {
      setPost({ ...post, [key]: value });
    }
  };

  useEffect(() => {
    getPostInfo();
  },[router.isReady, getPostInfo]);

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
      <FormBlogPost isEdit post={post} action={action} open={open} handleAction={handleAction} handleChange={handleChange}></FormBlogPost>
      <Stack marginTop='16px' flexDirection='row' justifyContent='end'>
        {fabAction.map((item, index)=> <FabBlogPost key={index} item={item} handleOpen={handleOpen}></FabBlogPost>)}
      </Stack>
    </Container>
  );
}
