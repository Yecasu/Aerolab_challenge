import {Box, BoxProps, Stack, Text, Image, Center, Divider, Flex, Button} from '@chakra-ui/react';
import React from 'react';

import { Product } from '../types';
import coin from "~/assets/icons/coin.svg";
import { usePoints, useRedeem } from '~/user/hooks';

interface Props extends BoxProps {
    product: Product;
    isSelected: boolean; 
}

const ProductCard: React.FC<Props> = ({product, isSelected, ...props}) => {
    const [points] = usePoints();
    const canBuy =  product.cost <= points;
    const redeem = useRedeem();

    function handleRedeem() {
        if (canBuy) {
            return redeem(product)
        }
    }
    
    return ( 
        <Box 
            backgroundColor="white" 
            borderRadius="sm" 
            boxShadow="md" 
            padding={6} 
            cursor={canBuy ? "pointer" : "not-allowed"}
            opacity={canBuy ? 1 : 0.5}
            position="relative" 
            {...props}
        >
            <Stack spacing={3}>
                <Stack
                  alignItems="center"
                  backgroundColor="white" 
                  borderRadius={9999}
                  borderColor={canBuy ? "primary.500" : "orange.500"}
                  borderWidth={1} 
                  color={canBuy ? "primary.500" : "orange.500"} 
                  direction="row" 
                  fontSize="sm" 
                  fontWeight="500" 
                  justifyContent="center" 
                  paddingX={3} 
                  paddingY={1} 
                  position="absolute" 
                  right={6} 
                  spacing={2} 
                  top={5}
                > 
                   <Text>{canBuy ? product.cost : `Missing ${product.cost - points} points`}</Text>
                   <Image height={4} src={coin} width={4} />
                </Stack>
                <Center>
                    <Image objectFit="contain" src={product.img.url} width={64} />
                </Center>
                <Divider />
                <Stack alignItems="flex-start" spacing={0}>
                    <Text color="gray.500" fontSize="sm">
                        {product.category}
                    </Text>
                    <Text fontWeight="500">{product.name}</Text>
                </Stack>
            </Stack>
            {isSelected && (
                <Flex 
                    alignItems="center" 
                    borderRadius="sm" 
                    height="100%" 
                    justifyContent="center" 
                    left={0} 
                    position="absolute" 
                    top={0} 
                    width="100%" 
                    zIndex={2} 
                >
                    <Box 
                        backgroundColor={canBuy ? "primary.500" : "gray.500"}
                        borderRadius="sm" 
                        height="100%" 
                        left={0} 
                        opacity={0.9} 
                        position="absolute" 
                        top={0} 
                        width="100%"
                    />
                        <Stack color="white" fontSize="2xl" fontWeight="bold" spacing={6} zIndex={3}>
                            <Stack spacing={0}>
                                <Text>{points}</Text>
                                <Text borderBottomColor="white" borderBottomWidth={2}>
                                    -{product.cost}
                                </Text>
                                <Text>{points-product.cost}</Text>
                            </Stack>
                            {canBuy && (
                                <Button color="primary.500" onClick={handleRedeem}>
                                    Redeem now 
                                </Button>
                            )}
                        </Stack>
                </Flex>
            )}
                    
        </Box>
    );
};

export default ProductCard;