import { 
  Button, 
} from "@chakra-ui/react";

interface PaginationItem{
  number: number;
  isCurrent?: boolean;
}

export const PaginationItem = ({ isCurrent = false, number }) => {
  
  if(isCurrent){
    return (
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4"
        colorScheme="pink" 
        disabled 
        _disabled={{
          bgColor: 'pink.500',
          cursor: "default",
        }}
      >
        { number }
      </Button>
    );
  }else{
    return(
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4"
        bgColor="gray.700"
        _hover={{
          bg: 'gray.500'
        }}
      >
        { number }
      </Button>
    )
  }

}