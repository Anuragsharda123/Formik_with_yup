import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function App() {

  const validationSchema = yup.object().shape({
    address:yup.array().of(
      yup.object().shape({
        title: yup.string()
        .required("title field is required bro 🤟")
        .matches(/^(?!.*\s{2,}).*$/, "Bhai itni space kya krega??"),
        
        street:yup.string()
        .required("street field required bro 🤟")
        .matches(/^(?!.*\s{2,}).*$/, "Bhai itni space kya krega??"),

        city:yup.string()
        .required("City field is required bro 🤟")
        .matches(/^(?!.*\s{2,}).*$/, "Bhai itni space kya krega??"),

        country:yup.string()
        .required("country field is required bro 🤟")
        .matches(/^(?!.*\s{2,}).*$/, "Bhai itni space kya krega??"),

        pincode:yup.string()
        .length(6,"Pincode should be of 6 digits")
        .matches(/^(?!.*\s{2,}).*$/, "Bhai itni space kya krega??")
        .required("Bhai pin code to de")
      })
    )
  });
  return (
    <>
    <div className='App'>

    <Formik
    initialValues={{
      address:[{
        title:'',
        street:'',
        city:'',
        country:'',
        pincode:''
      }]
    }}
    validationSchema={validationSchema}
    

    >
      {({values, setFieldValue, validateForm}) => (
        <Form>
          {values.address.map((_, index) => (
            <div key={index}>
              {['title','street', 'city', 'country', 'pincode'].map((field, i) => (
                <div key={i}>
                  <label> {field}: </label>
                  <Field name={`address[${index}].${field}`} placeholder={`Enter ${field}`} />
                  <ErrorMessage name={`address[${index}].${field}`} component="div" style={{ color: 'red' }} />
                </div>
              ))}

              {values.address.length >1 && (
                <button onClick={()=>{
                  const updatedData = values.address.filter((_, arrindex) => arrindex !== index);
                  setFieldValue('address', updatedData);
                }}>
                Delete
              </button>
              )}
            </div>
          ))}
          <button type='button' onClick={async ()=>{
            const errors = await validateForm();
            if(Object.keys(errors).length ===0)
            {
              const newData = [...values.address, {title:'', street:'', city:'', country:'', pincode:''}];
              setFieldValue('address', newData);
            }
            else{
              alert("Validation errors", errors);
            }

          }}>Add address</button>
        </Form>
      )}

    </Formik>


      </div>
    </>
  );
}

export default App;
