import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import OAuth from '../components/OAuth';
import { useSearchParams } from "react-router-dom";

export default function SignUp() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    // Get the token from URL query parameters
    const token = searchParams.get('token');
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    } else {
      setErrorMessage('Invite token is missing. Please check your invite link.');
    }
  }, [searchParams]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.firstName ||
      !formData.initials ||
      !formData.lastName ||
      !formData.contact ||
      !formData.gender ||
      !formData.grade ||
      !formData.password
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/auth/signup?token=${formData.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen m-20">
      <div className="flex p-3 w-full mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <p>Elimu School</p>
          <h1 className="text-sm mt-5 font-italic">
            <span className="font-bold">Motto:</span> Education is the key to
            success
          </h1>
        </div>
        {/* right */}

        <div className="flex-1 w-full">
          <form className="grid grid-cols-1 lg:grid-cols-2  gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Initials" />
              <TextInput
                type="text"
                placeholder=""
                id="Initials"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your First Name" />
              <TextInput
                type="text"
                placeholder="First Name"
                id="firstName"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your LastName" />
              <TextInput
                type="text"
                placeholder="Last Name"
                id="lastName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <input type="hidden" name="token" value={formData.token} />

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">signing up...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
