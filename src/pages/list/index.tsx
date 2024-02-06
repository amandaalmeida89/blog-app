import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { formattedDate } from '../../utils/formatter';
import { PostResponse } from '../../types/Post';
import { useBlogContext } from '../../services/ContextProvider';
import { useLocalStorage } from '../../services/useLocalStorage';
import { FabBlogPost } from '../../components/FabBlogPost';
import { FormBlogPost } from '../../components/FormBlogPost';

export default function BlogList() {
  const [list, setList] = useState<PostResponse[]>([]);
  const [postInfo, setPostInfo] = useState({ title: '', content: '', imgUrl: null });
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const { createPost, getList, pagination } = useBlogContext();
  const [ page, setPage ] = useLocalStorage('page', 1);
  const router = useRouter();

  const fabAction = {
    type: 'create',
    label: 'New',
    icon: <AddIcon sx={{ mr: 1 }} />,
    extended: true
  };

  const handleChange = (key: string, value: string) => {
    const newPost = { ...postInfo, ...{ [key]: value } };
    setPostInfo(newPost);
  };

  const handleAction = (action?: string) => {
    const createdAt = new Date().toISOString();
    const id = new Date().getTime();

    const isValidForm = postInfo.title && postInfo.content;

    if (action === 'save' && isValidForm) {
      const post = { id, createdAt };
      const newPost = { ...post, ...postInfo };
      createPost(newPost);
    }
    setOpen(false);
  };


  const handleOpen = () => {
    setOpen(true);
    setAction(action);
  };

  const handlePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const media = (imgUrl: string) => {
    const imageDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqgRAb49-QsVJpeNhEzlwDb5nxh7u8M9t-Q&usqp=CAU';
    const image = imgUrl ? imgUrl : imageDefault;
    return <CardMedia component="img" sx={{ height: { xs: 266, md: 150, lg: 266 }}} image={image} alt="image blog"></CardMedia>;
  };

  const redirectToDetail = (id: number) => {
    const pathname = `/details/${id}`;
    return router.push({ pathname, query: { post: id }});
  };

  useEffect(() => {
    const list = getList(page);
    setList(list);
  },[page, getList]);

  return (
    <Stack>
      <Stack alignItems='end'>
        <FabBlogPost item={fabAction} handleOpen={handleOpen}></FabBlogPost>
      </Stack>
      <FormBlogPost isEdit={false} action={action} open={open} handleAction={handleAction} handleChange={handleChange}></FormBlogPost>
      <Grid container spacing={2}>
        {list.map(({ title, imgUrl, content, createdAt, id }, index) =>
          <Grid justifyContent={'center'} display={'flex'} key={index} item xs={12} sm={12} md={3}>
            <Card sx={{maxWidth: { xs: 400, md: 280, lg: 400 }, width: '100%', marginTop:'32px', cursor:'pointer'}} key={index} onClick={() => redirectToDetail(id)}>
              {media(imgUrl || '')}
              <CardContent>
                <Typography gutterBottom fontWeight='500' textAlign='center'>{formattedDate(createdAt)}</Typography>
                <Typography textAlign='center' color='primary.dark' variant='h6'>{title}</Typography>
                <Typography textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden' color="text.secondary">
                  {content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Stack marginTop={'3%'} display={'flex'} alignItems={'center'} spacing={2}>
        {list.length
          ? <Pagination color="primary" count={pagination} page={page} onChange={handlePagination} />
          : ''
        }
      </Stack>
    </Stack>
  );
}
