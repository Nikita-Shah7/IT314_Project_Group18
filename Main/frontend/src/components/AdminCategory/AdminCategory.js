import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { category as categoryAxios } from '../AxiosCreate';
import './AdminCat.css';
import Category from './category';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonComponent from '../Button/ButtonComponent';
import Loader from '../Loader/Loader'; // Import your Loader component

export default function AdminCategory() {
  const navigate = useNavigate();

  if (!localStorage.getItem('isAdminAuth')) {
    navigate('/adminlogin');
  }

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryCnt, setCategoryCnt] = useState(0);

  useEffect(() => {
    setLoading(true);
    categoryAxios
      .get('/')
      .then((response) => {
        setCategoryCnt(response.data.count);
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('ERROR MESSAGE ::', error);
        setLoading(false);
      });
  }, [categoryCnt]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setLoading(false);
      console.log('UNAUTHORIZED!!');
      toast.error('Authorization error.');
      return;
    }

    const data = {
      categoryName: categoryName,
    };

    await categoryAxios
      .post('/', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCategoryCnt(categoryCnt + 1);
        setCategoryName('');
        setModal(!modal);
        setLoading(false);
        if (response.status === 201) {
          toast.success('Category created successfully.');
        }
      })
      .catch((error) => {
        console.log('ERROR MESSAGE ::', error);
        setLoading(false);
        toast.error('Category already exists.');
      });
  };

  return (
    <div className='adm-cat'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='addi-cat'>
            <div className='w-cat'>
              <h2 className='ti-cat'>Categories:</h2>
              <ButtonComponent color={'button4'} message={'Add Category'} func={toggleModal} />
            </div>
          </div>
          {modal && (
            <div className='overlay-cat' onClick={toggleModal}>
              <div className='content-ct' onClick={(event) => event.stopPropagation()}>
                <form className='mrow-cat' onSubmit={addCategory}>
                  <div className='row-cat'>
                    <label htmlFor='title'>Category Name:</label>
                    <input type='text' className='in-ca' name='category' required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                  </div>
                  <div className='bu-fo-cat'>
                    <ButtonComponent color={'primary'} message={'ADD'} />
                    <ButtonComponent color={'secondary'} message={'CLOSE'} func={toggleModal} />
                  </div>
                </form>
              </div>
            </div>
          )}
          <section className='item-list-cat'>
            {category.map((item) => (
              <Category key={item.category_id} data={item} categoryCnt={categoryCnt} setCategoryCnt={setCategoryCnt} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
