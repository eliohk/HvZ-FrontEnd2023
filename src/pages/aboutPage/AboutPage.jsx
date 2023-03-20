import { AiOutlineWarning } from 'react-icons/ai';
import Alert from 'react-bootstrap/Alert';

const AboutPage = () => {
    return (
        <div className="container" style={{
            borderRadius:"32px",
            marginLeft:"10em",
            marginTop:"4em"
        }}>
            <h1 className="mt-3 mb-3" style={{
                color:"white",
                }}>We're sorry,</h1>
            <Alert key="danger" variant="danger" className="w-50">
            <AiOutlineWarning/> <i> This page has no functionality.</i>
            </Alert>
            <h1 style={{
                color:"white"
            }}>But thank you, come again {"<3"}</h1>
      </div>
    );
  };
  export default AboutPage;