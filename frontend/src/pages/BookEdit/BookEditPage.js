import { useParams } from 'react-router-dom';
import classes from './bookEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/bookService';
import Title from '../../components/Title/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function BookEditPage() {
  const { bookId } = useParams();
  const [coverImageUrl, setImageUrl] = useState();
  const isEditMode = !!bookId;
  console.log('bookId:', bookId);
  console.log('isEditMode:', isEditMode);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(bookId).then(book => {
      if (!book) return;
      reset(book);
      setImageUrl(book.coverImageUrl);
    });
  }, [bookId]);

  const submit = async bookData => {
    const book = { ...bookData, coverImageUrl };

    if (isEditMode) {
      await update(book);
      toast.success(`Book "${book.title}" updated successfully!`);
      return;
    }

    const newbook = await add(book);
    toast.success(`Book "${book.title}" added successfully!`);
    navigate('/admin/editbook/' + newbook.id, { replace: true });
  };

  const upload = async event => {
    setImageUrl(null);
    const coverImageUrl = await uploadImage(event);
    setImageUrl(coverImageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Book' : 'Add Book'} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {coverImageUrl && (
            <a href={coverImageUrl} className={classes.image_link} target="blank">
              <img src={coverImageUrl} alt="Uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Title"
            {...register('title', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register('tags')}
            error={errors.tags}
          />

          <Input
            type="text"
            label="Genres"
            {...register('genres', { required: true })}
            error={errors.genres}
          />

          <Input
            type="text"
            label="Publication Year"
            {...register('publicationYear', { required: true })}
            error={errors.cookTime}
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}
