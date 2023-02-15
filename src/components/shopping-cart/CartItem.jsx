import React from 'react';
import styled from 'styled-components';

function CartItem({ book, handleDelete, handleMinus, handlePlus }) {
  const onDelete = () => {
    handleDelete(book.id);
  };

  const onMinus = () => {
    if (book.quantity === 0) {
      return;
    }
    handleMinus(book.id);
  };

  const onPlus = () => {
    handlePlus(book.id);
  };

  return (
    <BookItem>
      <CheckBox>
        <input type="checkbox" />
      </CheckBox>
      <ListBox>
        <BookImage src={book.bookImage} alt="책 이미지입니다." />
        <BookInfo>
          <Span>{book.title}</Span>
        </BookInfo>
      </ListBox>
      <CartInfo>
        <Quantity>
          <MinusBtn>
            <MinusImg src="images/minusBtn.png" alt="감소 버튼" onClick={onMinus} />
          </MinusBtn>
          <NumberInput type="number" value={book.quantity} />
          <PlusBtn>
            <PlusImg src="images/plusBtn.png" alt="증가 버튼" onClick={onPlus} />
          </PlusBtn>
        </Quantity>
        <Price>{`${book.price}원`}</Price>
      </CartInfo>

      <button type="button" onClick={onDelete}>
        삭제
      </button>
    </BookItem>
  );
}

export default CartItem;

const BookItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10px 30px 0;
`;

const CheckBox = styled.div`
  line-height: 100%;
`;

const ListBox = styled.div`
  display: flex;
  margin-right: 160px;
`;

const BookImage = styled.img`
  width: 80px;
  height: 100px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const Span = styled.span``;

const CartInfo = styled.div`
  display: flex;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const NumberInput = styled.input`
  display: block;
  width: 30px;
  text-align: center;
  border: 1.5px solid #bdbdbd;
`;

const MinusBtn = styled.button`
  width: 25px;
  height: 25px;
  padding: 0;
  border: 1.5px solid #bdbdbd;
  background-color: white;
  margin-right: 5px;
`;

const MinusImg = styled.img`
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
`;

const PlusBtn = styled.button`
  width: 25px;
  height: 25px;
  padding: 0;
  border: 1.5px solid #bdbdbd;
  background-color: white;
  margin-left: 5px;
`;

const PlusImg = styled.img`
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
`;

const Price = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #000000;
  margin-left: 50px;
`;
