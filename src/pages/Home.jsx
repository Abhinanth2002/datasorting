import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px;
`;

const ProductCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
  font-weight: 500;
  word-wrap: break-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

function Home() {
  const [ApiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setApiData(res.data);
        console.log('setApiData value', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

 
  const sortProducts = (option) => {
    let sortedData = [...ApiData];
    
    if (option === 'asc') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (option === 'desc') {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setApiData(sortedData);
  };

  return (
    <>
      
      <ButtonContainer>
        <Button onClick={() => sortProducts('asc')}>Price: Low to High</Button>
        <Button onClick={() => sortProducts('desc')}>Price: High to Low</Button>
      </ButtonContainer>

      
      <Container>
        {ApiData.map((li) => (
          <ProductCard key={li.id}>
            <ProductImage src={li.image} alt={li.title} />
            <Title>{li.title}</Title>
            <p>${li.price}</p>
          </ProductCard>
        ))}
      </Container>
    </>
  );
}

export default Home;
