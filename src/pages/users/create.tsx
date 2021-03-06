import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  FormErrorMessage
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { Input } from '../../components/Form/Input';

import { SubmitHandler, useForm, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';



type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}


//Esquema de validação;
const createUserFormSchema = yup.object().shape({
  name:  yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup.string().required("Senha é obrigatório").min(8, "No mínimo 8 caracteres"),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});
/*
  password_confirmation => Verifica se ele é um dos "oneOf([])"
  Ou ele é vazio(estado inicial) ou se ele bate com "password"
*/


export default function CreateUser(){
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = formState;

  const handleCreate: SubmitHandler<CreateUserFormData>  =  async (values, e ) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Box>
      <Header/>
      <Flex w="100%" my="6" maxW={ 1480 } mx="auto" px="6">
        <Sidebar/>

        <Box onSubmit={ handleSubmit(handleCreate) } as="form" flex="1" borderRadius={8} bg="gray.800" p={["4", "6", "8"]}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700"/>

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["4", "6", "8"]} w="100%">
              <Input 
                unikId="nameCreate"
                name="myname"
                label="Nome completo"
                error={errors?.name}
                {...register("name")}
              />
              <Input
                unikId="emailCreate"
                name="email"
                type="email"
                label="E-mail"
                error={errors?.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["4", "6", "8"]} w="100%">
              <Input 
                unikId="passCreate"
                name="password"
                type="password"
                label="Senha"
                error={errors?.password}
                {...register("password")}
                
              />
              <Input
                unikId="confirmPassCreate"
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors?.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>              
              </Link>
              <Button 
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
        
      </Flex>
    </Box>
  )
}