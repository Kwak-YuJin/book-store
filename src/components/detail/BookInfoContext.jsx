import { useState, useEffect } from 'react';
import Api from 'utils/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function BookInfoContext() {
  const [foundBook, setFoundBook] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await Api.get(`/books`, {
        params: {
          bookID: id
        }
      }).then((response) => response.data);
      setFoundBook([response]);
    };
    fetchBooks();
  }, []);

  return (
    <BookInfoWrapper>
      <FoundBookImg src={foundBook?.[0]?.imageUrl} alt="이미지" />
      <DescriptionTable>
        <DescriptionTbody>
          <tr>
            <DescriptionTd bold>{foundBook?.[0]?.title}</DescriptionTd>
            <DescriptionTd>{`${foundBook?.[0]?.author} | ${foundBook?.[0]?.publisher}  |  ${foundBook?.[0]?.publishedDate}`}</DescriptionTd>
          </tr>

          <tr>
            <DescriptionTd>상태</DescriptionTd>
            <DescriptionTd>{foundBook?.[0]?.condition}</DescriptionTd>
          </tr>
          <tr>
            <DescriptionTd>재고</DescriptionTd>
            <DescriptionTd>{`${foundBook?.[0]?.stock} 부`}</DescriptionTd>
          </tr>
          <tr>
            <DescriptionTd>판매가</DescriptionTd>
            <DescriptionTd>{`${foundBook?.[0]?.price} 원`}</DescriptionTd>
          </tr>
        </DescriptionTbody>
      </DescriptionTable>
    </BookInfoWrapper>
  );
}

const BookInfoWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const FoundBookImg = styled.img`
  width: 30%;
  height: 435px;
  margin-top: 5.6rem;
`;

const DescriptionTable = styled.table`
  box-sizing: border-box;
  width: 70%;
  height: 414px;
  border-top: 4px solid #353535;
  margin: 5.9rem 0 0 4rem;
  border-collapse: collapse;
`;

const DescriptionTbody = styled.tbody`
  height: 99px;
  &:first-child {
    height: 117px;
  }
`;

const DescriptionTd = styled.td`
  vertical-align: middle;
  &:first-child {
    width: 40%;
    text-align: center;
    font-family: ${(props) => (props.bold ? 'NotoSansKR-Bold' : 'NotoSansKR-Regular')};
    font-size: 25px;
    line-height: ${(props) => (props.bold ? '41px' : '43px')};
  }
  margin-left: 28px;
  border-bottom: 1px solid #b5b5b5;
  font-size: 20px;
  line-height: 29px;
`;

export default BookInfoContext;

// _id: 63f215b543f49c54529a68db
// _id: 63f21764bce010f1e5053c89
