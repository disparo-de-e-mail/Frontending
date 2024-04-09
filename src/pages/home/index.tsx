import style from './style.module.css'
import { CreateEmail, CreateEmailErrors } from '@/@types/generate/imediatoTypes'
import { type EmailOptions } from '@/@types/groupsEmail/emailGroup'
import { HomeLayout } from '@/templates/layout'
import {
  Box,
  Boxed,
  ButtonSecondary,
  Grid,
  GridItem,
  Select,
  Stack,
  Text2,
  Text6,
  TextField,
} from '@telefonica/mistica'
import React, { useState } from 'react'

export default function HomePage(): JSX.Element {
  const API_URL = ''
  const [errors, setErrors] = useState<CreateEmailErrors>({})
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createEmail, setCreateEmail] = useState<CreateEmail>({
    Assunto: '',
    Corpo: '',
    Remetente: '',
    To: '',
  })

  const options = [{ value: 'Teste1', text: 'Grupo de e-mails do Teste1' }]

  const [ManagementOptionsSelected, setManagementOptionsSelected] =
    useState<string>('')
  const handleCloseDialog = () => setDialogOpen(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('O Submit foi acionado', handleSubmit)
    setErrors({})
    const assunto = createEmail.Assunto
    const corpo = createEmail.Corpo
    const remetente = createEmail.Remetente
    const to = createEmail.To

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
          <form onSubmit={handleSubmit}>
            <Grid columns={1} rows={1} gap={16}>
              <GridItem>
                <Box padding={16}>
                  <Boxed>
                    <Box padding={16}>
                      <Text2 regular>Assunto</Text2>
                    </Box>
                    <Box padding={16}>
                      <TextField
                        label={''}
                        name={'assunto'}
                        fullWidth
                        autoComplete="off"
                        value={createEmail.Assunto}
                        onChange={(e) =>
                          setCreateEmail({
                            ...createEmail,
                            Assunto: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Boxed>
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
                        value={createEmail.Corpo}
                        onChange={(e) =>
                          setCreateEmail({
                            ...createEmail,
                            Corpo: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Boxed>
                </Box>
                <Box padding={16}>
                  <Boxed>
                    <Box padding={16}>
                      <Text2 regular>Remetente</Text2>
                    </Box>
                    <Box padding={16}>
                      <TextField
                        label={''}
                        name={'remetente'}
                        fullWidth
                        autoComplete="off"
                        value={createEmail.Remetente}
                        onChange={(e) =>
                          setCreateEmail({
                            ...createEmail,
                            Remetente: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Boxed>
                </Box>
                <Box padding={16}>
                  <Boxed>
                    <Box padding={16}>
                      <Text2 regular>Destinatário</Text2>
                    </Box>
                    <Box padding={16}>
                      <Select
                        label={''}
                        name={'To'}
                        value={ManagementOptionsSelected}
                        onChangeValue={(value) => {
                          setManagementOptionsSelected(value)
                        }}
                        options={options}
                      />
                    </Box>
                  </Boxed>
                </Box>
              </GridItem>
            </Grid>
            <Box
              padding={16}
              paddingX={4}
              className={style.containerSubmitButton}
            >
              <ButtonSecondary submit small className={style.submitButton}>
                Disparar e-mail
              </ButtonSecondary>
            </Box>
          </form>
        </Stack>
      </Box>
    </HomeLayout>
  )
}
