import { useState, useRef } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Text from '../components/Text';
import { toJpeg } from 'html-to-image';

const EditPage = () => {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);
  const memeRef = useRef(null);  // useRef here

  const addText = () => {
    setCount(count + 1);
  };

  const handleExport = () => {
    if (memeRef.current === null) return;

    toJpeg(memeRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'meme.jpeg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Export failed:', err);
      });
  };

  return (
    <div>
      <div ref={memeRef} className="meme mt-5 mb-5">
        <img src={params.get("url")} width="300px" />
        {Array(count).fill(0).map((_, i) => <Text key={i} />)}
      </div>
      <button onClick={addText}>Add Text</button>
      <button style={{ backgroundColor: "green", color: "white" }} onClick={handleExport}>Save</button>
    </div>
  );
};

export default EditPage;
