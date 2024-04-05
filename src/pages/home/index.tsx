import { CreateEmail, CreateEmailErrors } from '@/@types/generate/imediatoTypes'
import { HomeLayout } from '@/templates/layout'
import {
  Box,
  Boxed,
  Grid,
  GridItem,
  Stack,
  Text2,
  Text6,
  TextField,
} from '@telefonica/mistica'
import React, { useState } from 'react'

export default function HomePage(): JSX.Element {
  const API_URL = 'http://192.168.1.15:5000'
  const [errors, setErrors] = useState<CreateEmailErrors>({})
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createEmail, setCreateEmail] = useState<CreateEmail>({
    Assunto: '',
    Corpo: '',
    Remetente: '',
    To: '',
  })
  const managementOptions = useState<['Teste 1']>()
  const handleCloseDialog = () => setDialogOpen(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('O Submit foi acionado', handleSubmit)
    setErrors({})
    {
      /* TODO -
     BUG: Resolver erro: 'CreateEmail' só faz referência a um tipo, mas está sendo usado como valor no momento.ts(2693) any
 
 */
    }
    const createEmail = new CreateEmail(e.currentTarget)
    const assunto = createEmail.get('Assunto') as string
    const corpo = createEmail.get('Corpo') as string
    const remetente = createEmail.get('Remetente') as string
    const to = createEmail.get('To') as string

    const createEmailForBackend = {
      ...createEmail,
      assunto: assunto,
      corpo: corpo,
      remetente: remetente,
      to: to,
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createEmailForBackend),
    }

    try {
      const response = await fetch(
        `${API_URL}/emails/criar/imediato`,
        requestOptions,
      )
      console.log('Resposta do Server', response)
      const responseData = await response.json()

      if (response.ok) {
        setDialogMessage('E-mail enviado com sucesso!!')
        setDialogOpen(true)
      } else {
        switch (response.status) {
          case 409:
            setDialogMessage('Conflito na solicitação.')
            break
          case 404:
            setDialogMessage(
              'A página solicitada não pode ser encontrada no servidor do site.',
            )
            break
          case 401:
            setDialogMessage(
              'Credenciais são inválidas ou o navegador não consegue autenticá-las.',
            )
            break
        }
      }
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error)
      setDialogMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
      )
      setDialogOpen(true)
    }
  }

  return (
    <HomeLayout>
      <Box paddingY={24}>
        <Stack space={16}>
          <Box padding={16}>
            <Text6>Conteúdo do E-mail</Text6>
          </Box>

          <Grid columns={1} rows={1} gap={16}>
            {/* TODO -
             BUG: Resolver erro: O argumento do tipo 'FormEvent<HTMLDivElement>' não é atribuível ao parâmetro do tipo 'FormEvent<HTMLFormElement>'.
          O tipo 'HTMLDivElement' não tem as propriedades a seguir do tipo 'HTMLFormElement': acceptCharset, action, autocomplete, elements e mais 15.ts(2345)
         
         */}
            <div key={'form'} onSubmit={(e) => handleSubmit(e)}>
              <GridItem>
                <Box padding={16}>
                  <TextField
                    label={'Assunto'}
                    name={'assunto'}
                    fullWidth
                    autoComplete="off"
                  />
                </Box>
                <Box padding={16}>
                  <Boxed>
                    <Box padding={16}>
                      <Text2 regular>Corpo</Text2>
                    </Box>

                    <Box padding={16}>
                      <TextField
                        label={''}
                        name={'corpo'}
                        fullWidth
                        autoComplete="off"
                        multiline
                      />
                    </Box>
                  </Boxed>
                </Box>
                <Box padding={16}>
                  <Boxed>
                    <Box padding={16}>
                      <Text2 regular>Remetente</Text2>
                    </Box>
                    {/* TODO -
     NOTE: Fazer uma função -  options - para component Select 
     Modelo: const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));
 
 */}
                    <Box padding={16}></Box>
                  </Boxed>
                </Box>
              </GridItem>
            </div>
          </Grid>
        </Stack>
      </Box>
    </HomeLayout>
  )
}
