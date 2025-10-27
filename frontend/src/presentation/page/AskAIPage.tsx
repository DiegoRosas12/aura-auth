import { useState } from 'react'
import { Box, Heading, Text, VStack, HStack, Input, IconButton } from '@chakra-ui/react'
import { ArrowLeft, RotateCw, Star, FileText, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../components/MainLayout'

export const AskAIPage = () => {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')

  const handleAskQuestion = () => {
    console.log('Question asked:', question)
    // Aquí iría la lógica para enviar la pregunta a la IA
  }

  return (
    <MainLayout>
      <Box maxW="full" h="calc(100vh - 100px)" p={6}>
        <VStack align="stretch" h="full" gap={4}>
          {/* Header */}
          <HStack justify="space-between" w="full">
            <HStack gap={2} cursor="pointer" onClick={() => navigate(-1)}>
              <Box
                bg="white"
                borderRadius="4px"
                p={2}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <ArrowLeft size={20} />
                <Text fontWeight="bold" fontSize="16px">
                  Return
                </Text>
              </Box>
            </HStack>
            <Heading size="lg">Aura AI</Heading>
            <Box w="100px" /> {/* Spacer for centering */}
          </HStack>

          {/* Main Content Area */}
          <Box
            flex="1"
            border="2px solid"
            borderColor="#9a99c9"
            borderRadius="4px"
            p={6}
            overflow="auto"
          >
            <VStack align="stretch" gap={4} h="full">
              {/* AI Answer Section */}
              <Box>
                {/* Question Title */}
                <Box bg="#f9f5fd" px={4} py={2} mb={4}>
                  <Text fontWeight="bold" fontSize="16px" color="#101723">
                    What are the competitive dynamics between HubSpot and Salesforce
                  </Text>
                </Box>

                {/* Answer Text */}
                <Text fontSize="16px" color="#101723" lineHeight="1.5" mb={4}>
                  The competitive dynamics between HubSpot and Salesforce are largely driven by the
                  differences in their product offerings. Salesforce is an enterprise-level product
                  that is expensive and powerful, but is mainly used by larger companies. HubSpot, on
                  the other hand, is more focused on smaller teams and has grown its functionality to
                  offer robust enterprise-level solutions. Salesforce has an advantage in terms of its
                  integrations, as it is able to integrate with other enterprise-level products, while
                  HubSpot has been working to improve its native integrations and AI capabilities.
                  Salesforce also has a larger customer base, which gives it an advantage in terms of
                  market share. However, HubSpot has been able to differentiate itself by offering a
                  more user-friendly UI, as well as a more cost-effective solution.
                </Text>

                {/* Action Icons */}
                <HStack justify="flex-end" gap={4}>
                  <IconButton aria-label="Regenerate" size="sm" variant="ghost">
                    <RotateCw size={20} />
                  </IconButton>
                  <IconButton aria-label="Star" size="sm" variant="ghost">
                    <Star size={20} />
                  </IconButton>
                  <HStack gap={2}>
                    <IconButton aria-label="Shorter" size="sm" variant="ghost">
                      <FileText size={20} />
                    </IconButton>
                    <IconButton aria-label="Longer" size="sm" variant="ghost">
                      <FileText size={20} />
                    </IconButton>
                  </HStack>
                  <HStack gap={2}>
                    <IconButton aria-label="Thumbs up" size="sm" variant="ghost">
                      <ThumbsUp size={20} />
                    </IconButton>
                    <IconButton aria-label="Thumbs down" size="sm" variant="ghost">
                      <ThumbsDown size={20} />
                    </IconButton>
                  </HStack>
                  <IconButton aria-label="More options" size="sm" variant="ghost">
                    <MoreVertical size={20} />
                  </IconButton>
                </HStack>
              </Box>
            </VStack>
          </Box>

          {/* Input Area */}
          <Box position="relative">
            <Input
              placeholder="Hi, I'm Aura, your AI Assistant. Tell me, what question do you have?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
              bg="white"
              border="2px solid"
              borderColor="#b9bbc0"
              borderRadius="4px"
              px={4}
              py={3}
              fontSize="16px"
              h="51px"
            />
          </Box>
        </VStack>
      </Box>
    </MainLayout>
  )
}
