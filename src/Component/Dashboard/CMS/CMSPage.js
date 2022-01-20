import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';




const CMSPage = () => {
  const [cookie] = useCookies();
  const [content, setContent] = useState();


  useEffect(() => {
    const ID = cookie.pageId;
    if (ID) {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}/cms/getonepage?id=${ID}`
      }).then((el) => {
        setContent(el.data.resultData);
      })
    }
  }, [cookie]);



  if (!content) {
    return <section className='text-center p-5 mt-4'>
      <h3>'No Page Found'</h3>
    </section>
  }

  return (
    <section className='container' style={{ height: '100%' }}>
      <div className='p-2 mt-5 text-center'>
        <h3 className='mt-2'>{content.forPageName
          ? content.forPageName.pageName
          : 'Page'}
        </h3>
        <br/>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </section>
  )
}

export default CMSPage;
