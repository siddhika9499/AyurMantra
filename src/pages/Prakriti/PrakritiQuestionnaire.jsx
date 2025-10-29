import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
  LinearProgress,
} from '@mui/material';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';
import usePrakritiStore from '../../store/usePrakritiStore';
import prakritiService from '../../services/prakritiService';
import './Prakriti.css';

const PrakritiQuestionnaire = () => {
  const navigate = useNavigate();
  const { updateAnswers, setDoshaScores, setPrakritiType } = usePrakritiStore();

  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Namayush Questionnaire - Sample questions
  const questionSections = [
    {
      title: 'Physical Characteristics',
      questions: [
        {
          id: 'q1',
          question: 'What is your body frame?',
          options: [
            { value: 'thin', label: 'Thin, light frame', dosha: 'vata' },
            { value: 'medium', label: 'Medium, muscular frame', dosha: 'pitta' },
            { value: 'large', label: 'Large, heavy frame', dosha: 'kapha' },
          ],
        },
        {
          id: 'q2',
          question: 'How is your skin texture?',
          options: [
            { value: 'dry', label: 'Dry, rough, cool', dosha: 'vata' },
            { value: 'warm', label: 'Warm, oily, sensitive', dosha: 'pitta' },
            { value: 'thick', label: 'Thick, smooth, oily', dosha: 'kapha' },
          ],
        },
        {
          id: 'q3',
          question: 'How is your appetite?',
          options: [
            { value: 'irregular', label: 'Irregular, skips meals', dosha: 'vata' },
            { value: 'strong', label: 'Strong, cannot skip meals', dosha: 'pitta' },
            { value: 'steady', label: 'Steady, can skip meals easily', dosha: 'kapha' },
          ],
        },
      ],
    },
    {
      title: 'Mental & Emotional Traits',
      questions: [
        {
          id: 'q4',
          question: 'How would you describe your memory?',
          options: [
            { value: 'quick', label: 'Quick to learn, quick to forget', dosha: 'vata' },
            { value: 'sharp', label: 'Sharp, clear memory', dosha: 'pitta' },
            { value: 'slow', label: 'Slow to learn, long retention', dosha: 'kapha' },
          ],
        },
        {
          id: 'q5',
          question: 'How do you handle stress?',
          options: [
            { value: 'anxious', label: 'Anxious, worried', dosha: 'vata' },
            { value: 'irritable', label: 'Irritable, aggressive', dosha: 'pitta' },
            { value: 'calm', label: 'Calm, withdrawn', dosha: 'kapha' },
          ],
        },
        {
          id: 'q6',
          question: 'What is your sleep pattern?',
          options: [
            { value: 'light', label: 'Light, interrupted sleep', dosha: 'vata' },
            { value: 'moderate', label: 'Moderate, sound sleep', dosha: 'pitta' },
            { value: 'deep', label: 'Deep, prolonged sleep', dosha: 'kapha' },
          ],
        },
      ],
    },
    {
      title: 'Digestive & Energy Patterns',
      questions: [
        {
          id: 'q7',
          question: 'How is your digestion?',
          options: [
            { value: 'variable', label: 'Variable, gas, bloating', dosha: 'vata' },
            { value: 'strong', label: 'Strong, acidic, heartburn', dosha: 'pitta' },
            { value: 'slow', label: 'Slow, heavy feeling', dosha: 'kapha' },
          ],
        },
        {
          id: 'q8',
          question: 'What is your energy level throughout the day?',
          options: [
            { value: 'bursts', label: 'Bursts of energy, then fatigue', dosha: 'vata' },
            { value: 'high', label: 'High, sustained energy', dosha: 'pitta' },
            { value: 'steady', label: 'Steady, slow to start', dosha: 'kapha' },
          ],
        },
        {
          id: 'q9',
          question: 'How do you prefer temperature?',
          options: [
            { value: 'warm', label: 'Prefer warm climate', dosha: 'vata' },
            { value: 'cool', label: 'Prefer cool climate', dosha: 'pitta' },
            { value: 'moderate', label: 'Adapt well to all climates', dosha: 'kapha' },
          ],
        },
      ],
    },
  ];

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleNext = () => {
    if (activeStep < questionSections.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const calculateResults = () => {
    const doshaCount = { vata: 0, pitta: 0, kapha: 0 };

    Object.values(answers).forEach((answer) => {
      if (answer.dosha) {
        doshaCount[answer.dosha]++;
      }
    });

    const total = Object.values(doshaCount).reduce((sum, count) => sum + count, 0);
    const scores = {
      vata: Math.round((doshaCount.vata / total) * 100),
      pitta: Math.round((doshaCount.pitta / total) * 100),
      kapha: Math.round((doshaCount.kapha / total) * 100),
    };

    return scores;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const scores = calculateResults();
      const prakritiType = prakritiService.determinePrakriti(scores);

      setDoshaScores(scores);
      setPrakritiType(prakritiType);
      updateAnswers(answers);

      // Submit to backend
      await prakritiService.submitQuestionnaire({ answers, scores, prakritiType });

      navigate('/patient/dashboard');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepComplete = () => {
    const currentQuestions = questionSections[activeStep].questions;
    return currentQuestions.every((q) => answers[q.id]);
  };

  const progress = ((activeStep + 1) / questionSections.length) * 100;

  return (
    <Box className="prakriti-container">
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="primary">
              Prakriti Assessment
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Based on Namayush Questionnaire - Discover Your Ayurvedic Constitution
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {questionSections.map((section, index) => (
              <Step key={index}>
                <StepLabel>{section.title}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Questions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              {questionSections[activeStep].title}
            </Typography>

            {questionSections[activeStep].questions.map((question) => (
              <FormControl key={question.id} fullWidth sx={{ mb: 4 }}>
                <FormLabel sx={{ mb: 2, fontSize: '1rem', fontWeight: 500 }}>
                  {question.question}
                </FormLabel>
                <RadioGroup
                  value={answers[question.id]?.value || ''}
                  onChange={(e) => {
                    const selectedOption = question.options.find(
                      (opt) => opt.value === e.target.value
                    );
                    handleAnswer(question.id, selectedOption);
                  }}
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      sx={{
                        mb: 1,
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#f5f5f5',
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>

          {/* Alert if incomplete */}
          {!isStepComplete() && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Please answer all questions before proceeding
            </Alert>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
            >
              Back
            </Button>

            {activeStep === questionSections.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isStepComplete() || loading}
                startIcon={<CheckCircle />}
              >
                {loading ? 'Submitting...' : 'Complete Assessment'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepComplete()}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrakritiQuestionnaire;
