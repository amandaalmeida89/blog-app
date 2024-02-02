import { useEffect, useState, useContext } from 'react';
import { Context } from '../services/ContextProvider';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { formattedDate } from '../utils/formatter'
import { PostResponse } from '../types/Post'

export default function BloList() {
  const [list, setList] = useState<PostResponse[]>([])
  const { getList, pagination } = useContext(Context);
  const [page, setPage] = useState(1);

  const media = (imgUrl: string) => {
    const imageDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqgRAb49-QsVJpeNhEzlwDb5nxh7u8M9t-Q&usqp=CAU'
    const image = imgUrl ? imgUrl : imageDefault
    return <CardMedia component="img" sx={{ height: { xs: 266, md: 150, lg: 266 }}} image={image} alt="image blog"></CardMedia>
  }

  const date = (date: string) => {
    const formatted = formattedDate(date)
    const { day, month, year } = formatted || {}
    return `${month}.${day}.${year}`
  }

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const list = getList(page)
    setList(list)
  },[page]);

  return (
    <Stack>
      <Grid container spacing={2}>
        {list.map(({ title, imgUrl, content, createdAt }, index) =>
        <Grid justifyContent={'center'} display={'flex'} key={index} item xs={12} sm={12} md={3}>
          <Card sx={{maxWidth: { xs: 400, md: 280, lg: 400 }, width: '100%', marginTop:'32px', cursor:'pointer'}} key={index}>
            {media(imgUrl || '')}
            <CardContent>
              <Typography gutterBottom fontWeight='500' textAlign='center'>{date(createdAt)}</Typography>
              <Typography textAlign='center' color='#00695c' variant='h6'>{title}</Typography>
              <Typography textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden' color="text.secondary">
                {content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        )}
      </Grid>
      <Stack marginTop={'3%'} display={'flex'} alignItems={'center'} spacing={2}>
        <Pagination color="primary" count={pagination} page={page} onChange={handleChange} />
      </Stack>
    </Stack>
  )
}
