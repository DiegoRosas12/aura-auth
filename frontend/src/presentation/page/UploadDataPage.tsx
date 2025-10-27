import { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react'
import { MainLayout } from '../components/MainLayout'

export const UploadDataPage = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: 'Company research',
    companies: '',
    description: '',
    scope: '',
    expertTypes: [] as string[],
  })

  const expertOptions = [
    'All',
    'Competitor',
    'Customer',
    'Industry Consultant',
    'Former Executive',
    'Partner',
  ]

  const handleExpertToggle = (expert: string) => {
    setFormData((prev) => ({
      ...prev,
      expertTypes: prev.expertTypes.includes(expert)
        ? prev.expertTypes.filter((e) => e !== expert)
        : [...prev.expertTypes, expert],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que al menos un expert esté seleccionado
    if (formData.expertTypes.length === 0) {
      alert('Please select at least one expert type')
      return
    }
    
    console.log('Form submitted:', formData)
    // Aquí iría la lógica para enviar al backend
  }

  const handleCancel = () => {
    setFormData({
      projectName: '',
      projectType: 'Company research',
      companies: '',
      description: '',
      scope: '',
      expertTypes: [],
    })
  }

  // Validar si el formulario está completo
  const isFormValid = 
    formData.projectName.trim() !== '' &&
    formData.projectType.trim() !== '' &&
    formData.companies.trim() !== '' &&
    formData.expertTypes.length > 0

  return (
    <>
      {/* Hero Section - Full Width */}
      <Box
        position="relative"
        maxH="400px"
        h="400px"
        w="100%"
        bgGradient="linear(to-r, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), linear(to-r, #6869AC, #6869AC)"
        overflow="hidden"
      >
        {/* Background Image */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.9}
          style={{
            backgroundImage: 'url(/f5a228e1337faff61e75ea74307586f380ea6814.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <VStack position="relative" zIndex={1} justify="center" h="full" gap={4}>
          {/* Logo and Title */}
          <Heading size="3xl" color="white" fontWeight="bold">
            AURA
          </Heading>
          <Heading size="lg" color="white" fontWeight="bold" textAlign="center">
            Augmented Universal Research Assistant
          </Heading>
          <Text color="white" fontSize="md" textAlign="center">
            Your in one single intuitive platform along side with your team.
          </Text>
        </VStack>
      </Box>

      {/* Form Section */}
      <MainLayout>
        <Box maxW="5xl" mx="auto" p={6} transform="translateY(-100px)">
          <VStack align="stretch" gap={6}>
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="4px"
              p={6}
              shadow="xl"
            >
              <VStack align="stretch" gap={6}>
                {/* Header */}
                <HStack justify="space-between" w="full">
                  <Heading size="xl">New Data</Heading>
                </HStack>
                {/* Project Name */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Project name{' '}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Text>
                  <Input
                    placeholder="E.g. Microsoft Research"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    required
                    borderWidth="2px"
                    borderColor="gray.300"
                    px={4}
                  />
                </Box>

                {/* Project Type */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Project type{' '}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Text>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #CBD5E0',
                      borderRadius: '4px',
                      padding: '12px 16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Company research">Company research</option>
                    <option value="Market analysis">Market analysis</option>
                    <option value="Competitive intelligence">Competitive intelligence</option>
                  </select>
                </Box>

                {/* Companies */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Companies{' '}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Text>
                  <Input
                    placeholder="E.g. Microsoft"
                    value={formData.companies}
                    onChange={(e) => setFormData({ ...formData, companies: e.target.value })}
                    required
                    borderWidth="2px"
                    borderColor="gray.300"
                    px={4}
                  />
                </Box>

                {/* Project Description */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Project Description
                  </Text>
                  <Input
                    placeholder="Please define the purpose for this project."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    borderWidth="2px"
                    borderColor="gray.300"
                    px={4}
                  />
                </Box>

                {/* Project Scope */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Project Scope
                  </Text>
                  <Textarea
                    placeholder="Tell us the range for the numbers of experts you want us to include for this research and the type of experts in order for us to start expert screening stage."
                    rows={3}
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    borderWidth="2px"
                    borderColor="gray.300"
                    px={4}
                    py={3}
                  />
                </Box>

                {/* Expert Types */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Expert{' '}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    {expertOptions.map((expert) => (
                      <Checkbox.Root
                        key={expert}
                        checked={formData.expertTypes.includes(expert)}
                        onCheckedChange={() => handleExpertToggle(expert)}
                        colorPalette="blue"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          borderWidth="2px"
                          borderColor={
                            formData.expertTypes.includes(expert) ? '#6869AC' : '#a2a3a8'
                          }
                          bg={formData.expertTypes.includes(expert) ? '#6869AC' : '#fcfcfc'}
                          _hover={{
                            borderColor: formData.expertTypes.includes(expert)
                              ? '#9A99C9'
                              : '#787C84',
                          }}
                        >
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label>{expert}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </Grid>
                </Box>

                {/* Buttons */}
                <HStack gap={4} pt={4}>
                  <Button
                    onClick={handleCancel}
                    type="button"
                    bg="white"
                    border="1px solid"
                    borderColor="#787c84"
                    color="#3e4551"
                    px={8}
                    py={2}
                    fontSize="18px"
                    fontWeight="normal"
                    _hover={{
                      bg: 'gray.50',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg="#E8E5F9"
                    border="1px solid"
                    borderColor="#AEADD5"
                    color="#3e4551"
                    px={8}
                    py={2}
                    fontSize="18px"
                    fontWeight="bold"
                    disabled={!isFormValid}
                    opacity={!isFormValid ? 0.5 : 1}
                    cursor={!isFormValid ? 'not-allowed' : 'pointer'}
                    _hover={{
                      bg: isFormValid ? '#D4D1F0' : '#E8E5F9',
                    }}
                  >
                    Upload
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </MainLayout>
    </>
  )
}
