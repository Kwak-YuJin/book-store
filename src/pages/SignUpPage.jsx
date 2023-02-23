import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from '../components/commons/pageTitle/PageTitle';
import Button from '../components/commons/button/Button';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const [warningId, setWarningId] = useState({
    visible: true,
    message: '',
  });

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [warningPassword, setWarningPassword] = useState({
    visible: true,
    message: '',
  });
  const [warningPasswordConfirm, setWarningPasswordConfirm] = useState({
    visible: true,
    message: '',
  });

  const [name, setName] = useState('');
  const [warningName, setWarningName] = useState({
    visible: true,
    message: '',
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [warningPhoneNumber, setWarningPhoneNumber] = useState({
    visible: true,
    message: '',
  });

  const [address, setAddress] = useState('');
  const [warningAddress, setWarningAddress] = useState({
    visible: true,
    message: '',
  });

  // 취소 버튼 클릭시
  const handleCancel = () => {
    navigate('/login');
  };

  // 아이디 로직
  const handleIdInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningId));

    if (userId.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningId(newWarning);
    }

    if (userId.length <= 5 || userId.match(new RegExp(/[^0-9a-z]/)) !== null) {
      newWarning.visible = true;
      newWarning.message = '5~20자의 영문 소문자, 숫자와 만 사용 가능합니다';

      return setWarningId(newWarning);
    }

    // 서버와 api 통신으로 해당 id의 중복을 검사

    newWarning.visible = false;
    setWarningId(newWarning);
  };

  // 비밀번호 로직
  const handlePasswordInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPassword));

    if (password.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPassword(newWarning);
    }
    if (
      password.length <= 8 ||
      password.match(new RegExp(/[^0-9a-zA-Z?!]/)) !== null
    ) {
      newWarning.visible = true;
      newWarning.message =
        '8~16자의 영문 소문자, 숫자와 ?!기호만 사용 가능합니다';

      return setWarningPassword(newWarning);
    }

    newWarning.visible = false;
    setWarningPassword(newWarning);
  };

  // 비밀번호 확인 로직
  const handlePasswordConfirmInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPasswordConfirm));

    if (passwordConfirm.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPasswordConfirm(newWarning);
    }

    if (password !== passwordConfirm) {
      newWarning.visible = true;
      newWarning.message = '비밀번호가 일치하지 않습니다.';

      return setWarningPasswordConfirm(newWarning);
    }

    newWarning.visible = false;
    setWarningPasswordConfirm(newWarning);
  };

  // 이름 로직
  const handleNameInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningName));

    if (name.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningName(newWarning);
    }
    newWarning.visible = false;
    setWarningName(newWarning);
  };

  // 전화번호 로직
  const handlePhoneNumberInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPhoneNumber));

    if (phoneNumber.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPhoneNumber(newWarning);
    }

    if (
      phoneNumber.match(
        new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/),
      ) === null
    ) {
      newWarning.visible = true;
      newWarning.message =
        '010-0000-0000 이나 010-000-0000 형식으로 입력해주세요.';

      return setWarningPhoneNumber(newWarning);
    }

    newWarning.visible = false;
    setWarningPhoneNumber(newWarning);
  };

  // 주소 로직
  const handleAddressInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningAddress));

    if (address.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningAddress(newWarning);
    }

    newWarning.visible = false;
    setWarningAddress(newWarning);
  };

  const handleSignUp = () => {
    if (
      warningId.visible ||
      warningName.visible ||
      warningAddress.visible ||
      warningPassword.visible ||
      warningPasswordConfirm.visible ||
      warningPhoneNumber.visible
    ) {
      return alert('모든 정보를 정상적으로 입력해주세요.');
    }

    // 서버통신

    alert('회원가입이 정상적으로 완료 되었습니다.');
  };

  return (
    <>
      <PageTitle title="회원가입" />
      <SignUpContainer>
        <SignUpListContainer>
          <SignUpList>
            <SignUpLabel htmlFor="id">아이디</SignUpLabel>
            <SignUpInput
              type="text"
              id="id"
              maxLength="20"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              onBlur={handleIdInputBlur}
            />
            {warningId.visible && (
              <WarningMessage>{warningId.message}</WarningMessage>
            )}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="password">비밀번호</SignUpLabel>
            <SignUpInputPassword
              type="password"
              id="password"
              maxLength="16"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={handlePasswordInputBlur}
            />
            {warningPassword.visible && (
              <WarningMessage>{warningPassword.message}</WarningMessage>
            )}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="confirmPassword">비밀번호 확인</SignUpLabel>
            <SignUpInputPassword
              type="password"
              id="confirmPassword"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              onBlur={handlePasswordConfirmInputBlur}
            />
            {warningPasswordConfirm.visible && (
              <WarningMessage>{warningPasswordConfirm.message}</WarningMessage>
            )}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="name">이름</SignUpLabel>
            <SignUpInputName
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={handleNameInputBlur}
            />
            {warningName.visible && (
              <WarningMessage>{warningName.message}</WarningMessage>
            )}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="phoneNumber">휴대폰 번호</SignUpLabel>
            <SignUpInputPhoneNumber
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              onBlur={handlePhoneNumberInputBlur}
            />
            {warningPhoneNumber.visible && (
              <WarningMessage>{warningPhoneNumber.message}</WarningMessage>
            )}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="address">주소</SignUpLabel>
            <SignUpInput
              type="text"
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              onBlur={handleAddressInputBlur}
            />
            {warningAddress.visible && (
              <WarningMessage>{warningAddress.message}</WarningMessage>
            )}
          </SignUpList>
        </SignUpListContainer>
        <Button
          type="submit"
          buttonTitle="취소"
          margin="0 60px"
          onClick={handleCancel}
        />
        <Button
          type="button"
          buttonTitle="가입하기"
          margin="0 60px"
          onClick={handleSignUp}
        />
      </SignUpContainer>
    </>
  );
}

export default SignUpPage;

const SignUpContainer = styled.div`
  width: 50%;
  margin: 60px auto;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.59);
`;

const SignUpListContainer = styled.ul`
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.59);
`;

const SignUpList = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const SignUpLabel = styled.label`
  display: flex;
  align-items: center;
  flex-basis: 20%;
  margin-right: 10px;
  padding-left: 30px;
  height: 100%;
  vertical-align: middle;
  font-weight: 700;
  background: rgba(217, 217, 217, 0.25);
`;

const SignUpInput = styled.input`
  display: block;
  flex-basis: 40%;
  padding-left: 10px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.31);
`;

const SignUpInputPassword = styled(SignUpInput)`
  flex-basis: 20%;
`;

const SignUpInputName = styled(SignUpInput)`
  flex-basis: 30%;
`;

const SignUpInputPhoneNumber = styled(SignUpInput)`
  flex-basis: 30%;
`;

const WarningMessage = styled.span`
  position: absolute;
  left: 20%;
  bottom: 3px;
  margin-left: 10px;
  font-size: 14px;
  color: red;
`;