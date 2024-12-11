async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
  
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); 
  
    setChatHistory((prev) => [...prev, { type: 'question', content: currentQuestion }]);
  
    try {
      const response = await axios({
        url: 'https://chatgpt-ai-chat-bot.p.rapidapi.com/ask',  // Replace %7Bid%7D with the correct category/group ID or endpoint
        method: "POST",
        headers: {
          "X-RapidAPI-Key": '52c2eb3079msh923204a2c2e1158p11e837jsn0bc86c535376',
          "X-RapidAPI-Host": 'chatgpt-ai-chat-bot.p.rapidapi.com',
        },
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });
  
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: 'answer', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [...prev, { type: 'answer', content: "An error occurred while getting the answer." }]);
    }
    setGeneratingAnswer(false);
  }
  