import ConfigSection from './components/ConfigSection';
import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';

import { useState } from 'react';

const App = () => {
	
  const [storedValues, setStoredValues] = useState([]);
  const [formData, setFormData] = useState({token: "",mode: "",fileId: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newFormData = new FormData(form);
    setFormData(newFormData)
};

  async function postRequest(url = "", data = {}) {
    try {

      console.log("Token is " + [...formData.entries()][0][1]);
      console.log("Token is " + formData["token"]);
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Authorization": "Bearer " + [...formData.entries()][0][1],
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      console.log("Response is " + response);
      if (response.ok) {
        return response.json(); // parses JSON response into native JavaScript objects
      } else {
        console.log("Received an error: " + response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

	const generateResponse = async (newQuestion, setNewQuestion) => {

    let url = "https://api.box.com/2.0/ai/ask"

		let body = {
			"mode": [...formData.entries()][1][1],
      "prompt": newQuestion,
      "items": [
          {
              "id": [...formData.entries()][2][1],
              "type": "file",
          },
      ],
      "dialogue_history": [],
      "config": {
          "is_streamed": false
      }
		};

		const response = await postRequest(url, body);

		if (response) {
      console.log(response)
      console.log(response.answer);
			setStoredValues([
				{
					question: newQuestion,
					answer: response.answer,
				},
				...storedValues,
			]);
      console.log("storedValues " + [...storedValues.entries()]);
      console.log("storedValues.length" + storedValues.length);
			setNewQuestion('');
		}
	};

	return (
		<div>
			<div className="header-section">
				<h1>Box AI API - React</h1>
				{storedValues.length < 1 && (
					<p>
						This is a simple Box AI API app based on the <a href="https://github.com/kinsta/chatgpt-clone" target="_blank" rel="noreferrer">ChatGPT Clone</a> project by Kinsta.
					</p>
				)}
			</div>

      <ConfigSection formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

			<FormSection generateResponse={generateResponse} />

			{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
		</div>
	);
};

export default App;