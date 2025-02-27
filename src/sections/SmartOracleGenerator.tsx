'use client';

import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Slider, TextField, Typography, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("Gemini API key is missing. Make sure to set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
}

const SmartOracleGenerator: React.FC = () => {
  const [source, setsource] = useState('');
  const [language, setLanguage] = useState('');
  const [gasLimit, setGasLimit] = useState(3000000);
  const [contractDesign, setContractDesign] = useState('');
  const [ercStandard, setErcStandard] = useState('');
  const [contractCode, setContractCode] = useState('Your code appears here...');
  const [userRequirements, setUserRequirements] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const sources = ['Web APIs', 'Blockchain Feeds', 'Financial Markets', 'Social Media & News', 'Scientific & Research Data','Healthcare Records','E-commerce & Supply Chain Data','Gaming & Virtual Economy Data','Crowdsourced Data '];
  const languages = ['Solidity', 'Rust', 'Vyper', 'Python'];
  const contractDesigns = ['Standard', 'Upgradeable', 'Proxy', 'Minimal'];
  const ercStandards = ['ERC-20', 'ERC-721', 'ERC-1155', 'ERC-777'];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isGenerated, setIsGenerated] = useState(false);
  const generateContractCode = async () => {
    if (!source || !language || !contractDesign || !ercStandard || !userRequirements) {
      setContractCode('Please provide all required inputs to generate the contract.');
      return;
    }

    setIsGenerating(true); // Change text to "Generating Contract..."
    
    const prompt = `Generate a fully optimized smart oracle using ${language} with the following specifications:
    source: ${source}
    Contract Design: ${contractDesign}
    ERC Standard: ${ercStandard}
    Gas Limit: ${gasLimit}
    User Requirements: ${userRequirements}
    Ensure the oracle follows best practices and security measures. Just generate the code with comments. Do not over explain`;

    try {
      if (!apiKey) {
        throw new Error("Missing API key for Gemini AI.");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const response = await model.generateContent(prompt);
      setContractCode(response.response.text());
    } catch (error) {
      console.error("Error generating contract:", error);
      setContractCode('Error generating contract. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      px={{ xs: 2, md: '1rem' }}
      py={4}
      component={Paper}
      elevation={3}
      borderRadius={4}
      sx={{
        backgroundColor: 'black',
        border: '4px solid',
        borderImage: 'linear-gradient(90deg, red, yellow, green, lightblue, blue) 1',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-sora), var(--font-space-grotesk)',
      }}
    >
        
      <Box flex={1} display="flex" flexDirection="column" gap={2}>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
  <Button
    variant="text"
    color="primary"
    onClick={copyToClipboard}
    startIcon={<ContentCopyIcon />}
  >
    {isCopied ? 'Copied!' : 'Copy Code'}
  </Button>
</Box>

        <TextField
          placeholder="Specify your smart oracle details and get an optimized code."
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: 'white', borderRadius: '5px' }}
          value={userRequirements}
          onChange={(e) => setUserRequirements(e.target.value)}
        />
        
        <Box
          p={2}
          border={1}
          borderRadius={2}
          height={250}
          overflow="auto"
          sx={{ backgroundColor: '#121212', color: 'white', borderColor: 'lightblue' }}
        >
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{contractCode}</Typography>
        </Box>

        {isGenerated && (
  <Button
    variant="outlined"
    color="secondary"
    onClick={copyToClipboard}
    startIcon={<ContentCopyIcon />}
    sx={{ mt: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'lightblue' } }}
  >
    {isCopied ? 'Copied!' : 'Copy Code'}
  </Button>
)}

        <Button
          variant="contained"
          color="primary"
          onClick={generateContractCode}
          sx={{ opacity: isGenerating ? 0.7 : 1 }}
        >
          {isGenerating ? "Generating Oracle..." : "Generate Oracle"}
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2} width={{ xs: '100%', md: 250 }}>
        <Typography variant="h6" color="white">Generate Smart Oracles</Typography>

        {/** source Select */}
        <Select value={source} onChange={(e) => setsource(e.target.value)} displayEmpty sx={selectStyles}>
          <MenuItem value="" disabled>Choose Source</MenuItem>
          {sources.map((item) => <MenuItem key={item} value={item} sx={menuItemStyles}>{item}</MenuItem>)}
        </Select>

        {/** Language Select */}
        <Select value={language} onChange={(e) => setLanguage(e.target.value)} displayEmpty sx={selectStyles}>
          <MenuItem value="" disabled>Choose Language</MenuItem>
          {languages.map((item) => <MenuItem key={item} value={item} sx={menuItemStyles}>{item}</MenuItem>)}
        </Select>

        {/** Contract Design Select */}
        <Select value={contractDesign} onChange={(e) => setContractDesign(e.target.value)} displayEmpty sx={selectStyles}>
          <MenuItem value="" disabled>Oracle Design</MenuItem>
          {contractDesigns.map((item) => <MenuItem key={item} value={item} sx={menuItemStyles}>{item}</MenuItem>)}
        </Select>

        {/** ERC Standard Select */}
        <Select value={ercStandard} onChange={(e) => setErcStandard(e.target.value)} displayEmpty sx={selectStyles}>
          <MenuItem value="" disabled>Choose ERC Standard</MenuItem>
          {ercStandards.map((item) => <MenuItem key={item} value={item} sx={menuItemStyles}>{item}</MenuItem>)}
        </Select>

        <Typography color="white">Set Gas Limit</Typography>
        <Slider
        value={gasLimit}
        onChange={(e, newValue) => setGasLimit(newValue as number)}
        min={1000000}
        max={10000000}
        step={500000}
        sx={{ color: 'lightblue' }}
        />
        <Typography color="white">Gas Limit: {gasLimit}</Typography>

      </Box>
    </Box>
  );
};

const selectStyles = {
  backgroundColor: 'black',
  color: 'green',
  borderRadius: '5px',
  border: '2px solid green',
  '& .MuiSelect-icon': { color: 'green' }
};

const menuItemStyles = {
  backgroundColor: 'black',
  color: 'green'
};

export default SmartOracleGenerator;
