import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Button from '@components/common/Button';

const WritingArea = ({ initValue, buttonText, onButtonClick }) => {
  const [text, setText] = useState(initValue);
  const [isPreview, setIsPreview] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const clickTab = (clickedPreview) => {
    if (isPreview !== clickedPreview) setIsPreview(!isPreview);
  };
  const inputTextarea = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setShowNumber(true);
    const showNumberTimer = setTimeout(() => {
      setShowNumber(false);
    }, 2000);
    return () => clearTimeout(showNumberTimer);
  }, [text]);

  return (
    <Wrapper>
      <Header>
        <Tab onClick={() => clickTab(false)} isSelected={!isPreview}>
          Write
        </Tab>
        <Tab onClick={() => clickTab(true)} isSelected={isPreview}>
          Preview
        </Tab>
      </Header>
      <Body>
        {isPreview ? (
          <>{text.length ? <ReactMarkdown>{text}</ReactMarkdown> : 'Nothing to preview'}</>
        ) : (
          <TextAreaWrapper>
            <Textarea placeholder='Leave a comment' value={text} onChange={inputTextarea} />
            <TypedLettersNumber
              showNumber={showNumber}
            >{`You typed ${text.length} letters`}</TypedLettersNumber>
          </TextAreaWrapper>
        )}
      </Body>
      <ButtonWrapper>
        <Button
          size='large'
          text={buttonText}
          onClick={() => {
            onButtonClick(text);
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.ul`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
`;

const Tab = styled.li`
  display: inline;
  position: relative;
  list-style: none;
  padding: 10px 20px;
  background-color: ${(props) => props.isSelected && 'white'};
  border: ${(props) => props.isSelected && `1px solid ${props.theme.color.borderColor}`};
  border-bottom: ${(props) => props.isSelected && '1px solid white'};
  border-radius: 5px 5px 0 0;
  cursor: pointer;
`;

const Body = styled.div`
  margin: 15px 10px;
`;

const TextAreaWrapper = styled.div`
  position: relative;
`;

const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 350px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 5px;
  &:focus {
    box-shadow: 0 0 3px ${({ theme }) => theme.color.blueColor};
  }
`;

const TypedLettersNumber = styled.div`
  position: absolute;
  right: 15px;
  bottom: 12px;
  color: ${({ theme }) => theme.color.secondaryTextColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: ${(props) => (props.showNumber ? '' : 'none')};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

WritingArea.propTypes = {
  initValue: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

WritingArea.defaultProps = {
  initValue: '',
};

export default WritingArea;
