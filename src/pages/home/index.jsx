import { Button } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeContainer } from './home-style'

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <Button
        onClick={() => navigate("/ui/map?showSearchBar=true")}
      >
        باز کردن نقشه
      </Button>
    </HomeContainer>
  )
}

export default Home