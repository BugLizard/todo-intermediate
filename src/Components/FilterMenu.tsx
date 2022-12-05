import {Dispatch, SetStateAction } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { 
  ChevronDownIcon,
} from '@chakra-ui/icons';

import { 
  Box, 
  Button
} from '@chakra-ui/react';

type Props = {
  FilterHandler:(status:string) => void;
}


const FilterMenu:React.FC<Props> = (props) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Button} 
            rightIcon={<ChevronDownIcon />}>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                props.FilterHandler('default');
              }}
            >全て表示</MenuItem>
            <MenuItem
              onClick={() => {
                props.FilterHandler('Untouched')
              }}
              >未着手</MenuItem>
            <MenuItem
              onClick={() => {
                props.FilterHandler('Start')
              }}
            >着手</MenuItem>
            <MenuItem
              onClick={() => {
                props.FilterHandler('Complete')
              }}
            >完了</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
    
  )
}

export default FilterMenu