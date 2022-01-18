import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabComponent = ({ content }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ marginBottom: 4 }}
      >
        {content.map(({ title, content }, index) => (
          <Tab key={index} label={title} value={index} />
        ))}
      </Tabs>
      {content.map(({ title, content }, index) => (index === value && (
        <div>
          {content}
        </div>
      )))}
    </Box>
  )
}

export default TabComponent
