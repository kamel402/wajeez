import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
const Home = () => {
  const [file, setFile] = useState(null);
  const [legalData, setlegalData] = useState("");
  const [explanation, setExplanation] = useState([]);
  const [summary, setSummary] = useState([]);
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("");
  const [legalDataLoading, setlegalDataLoading] = useState(null);


  useEffect(() => {
    console.log("legalData: ", legalData);
    console.log("result: ", result);
    console.log("explanation: ", explanation);
    console.log("file: ", file);
    console.log("language: ", language);
  }, [explanation, result, file, language]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log()
      return
    }
    const formData = new FormData();

    formData.append("pdfFile", file);



    const text = await fetch("http://localhost:3000/extract-text", {
      method: "post",
      body: formData
    }).then(response => {
      return response.text();
    })
      ;
    console.log({ text })
    setlegalData(text)


  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    // show "loading..." text
    const explanationElement = document.getElementById("loading");
    explanationElement.classList.remove("hidden");

    // Update medical data loading state with true
    setlegalDataLoading(true);




    // Implement check to make sure it is not a blank submission
    if (legalData != "") {


      let jsonResponse = await fetch('/api/define', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ legalData, language }),
      })

      let data1 = await jsonResponse.json()
      // Update explanation state with the response from GPT-3
      var res = data1.choices[0].text;
      setResult(res);
      // separate each term's description
      var lines = res.split(/\r?\n/);

      let jsonResponse2 = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ legalData, language }),
      })
      const data2 = await jsonResponse2.json()
      // Update summary state with the response from GPT-3
      var res2 = data2.choices[0].text;
      console.log(res2);
      var res2Final = res2.split("*")
      var res2Trimmed = res2Final.filter(item => item.length > 1)
      setSummary(res2Trimmed);


      // remove loading text
      explanationElement.classList.add("hidden");
      var trimmed = [];
      // identify the med term and its definition
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
          trimmed.push(lines[i]);
        }

        setExplanation(trimmed);
      }


      // Update medical data loading state with false to allow explanation to conditionally render
      setlegalDataLoading(false);
    } else {
      explanationElement.innerText = "You did not submit anything, please submit again."
    }
  };

  const languages = [
    { value: "arabic", label: "العربية" },
    { value: "english", label: "الانجليزية" },
    // add more languages as needed
  ];

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    console.log('language changed to: ', language)
  };

  return (
    <><Navbar />
    <div className="p-6 mb-4">
      <form
        className="flex flex-col bg-whiterounded-lg"
        onSubmit={handleSubmit}
      >
        <label className="block text-gray-700 mb-2 heading text-right" htmlFor="legal_data">
          :ادخل النص
        </label>
        {/*<input
      class="p-3 mb-4 rounded-lg w-1/2 md:w-1/3 lg:w-1/4 sandy"
      type="text"
      id="legal_data"
      onChange={(e) => setlegalData(e.target.value)}
/>*/}
        <div>
        <textarea
          className="float-right p-3 mb-4 rounded-lg w-1/2 md:w-1/3 lg:w-1/4 sandy text-right"
          id="legal_data"
          value={legalData}
          onChange={(e) => setlegalData(e.target.value)}
          name="legalData"
          cols="40"
          rows="5">
        </textarea>
        </div>
        <label className="text-right" htmlFor="language">:اختر لغة</label>
        <div>
        <select className="float-right  p-3 mb-4 rounded-lg w-1/2 md:w-1/3 lg:w-1/4 sandy"
          id="language" value={language} onChange={handleLanguageChange}>
          <option className="text-right" value="">--اختر--</option>
          {languages.map(({ value, label }) => (
            <option className="text-right" key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        </div>
        <div>
        <button
          className="float-right submit-btn hover:bg-gray-700 mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
          type="submit"
        >
          ارسل
        </button>
        </div>
      </form>

      {/* we set explanation element to be loading... or the explanation text based on conditional rendering */}
      {legalDataLoading == false && (
        <div className="report">
          <div className="report-col">
            <label className="text-right block text-gray-700 font-medium" htmlFor="explanation">
              :المصطلحات القانونية
            </label>
            <div>
              <p id="explanation" className="p text-right">
                {explanation.map((line, index) => (
                  <div key={index} className="desc">
                    <b>{line.substring(0, line.indexOf(":") + 1)}</b>
                    <p>{line.substring(line.indexOf(":") + 1)}</p>
                  </div>
                ))}
              </p>
            </div>
          </div>
          <div className="report-col">
            <div className="text-right block text-gray-700 font-medium">الملخص</div>
            <div className="desc">
              <ul>
                {summary.map((bullet, index) => (
                  <li className="summary-item text-right" key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
          
          
        </div>
      )}

      
      
      <form className="flex flex-col bg-whiterounded-lg"
>
<div>
      <p id="loading" className="float-right hidden">
      ...جار تبسيط المستند 
      </p>
      </div>
      <div>
        <label className="float-right block text-gray-700 mb-2 heading" htmlFor="file-selector">
          :ارفع ملف
        </label>
        
        </div>
       <div>
       <label htmlFor="file-selector" className="float-right text-right custom-file-upload">
        + اختر ملف 
        </label>
       </div>
        
        <input type="file" id="file-selector" onChange={onFileChange} />
        {/*<input type="button" id="upload" value="Upload" onClick={uploadFile} />*/}
        <div>
        <button
          className="float-right submit-btn hover:bg-gray-700 mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
          onClick={uploadFile}>
         PDF حلل ملف 
        </button>
        </div>
      </form>


    </div>
    </>
  );
};

export default Home;
