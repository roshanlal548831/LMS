import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {

  const [signupInput,setSignupInput] = useState({
      name:"",
      email:"",
      password:""
  });

  const singupHndlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log()
    setSignupInput({
        ...signupInput,[name]:value
     })
  };

  const handleOnSubmit = (e) => {
      e.preventDefault();
      console.log(signupInput)
  };


  // login functionalty 
  
  const [loginInput,setLoginInput] = useState({
      email:"",
      password:""
  });

  const loginHndlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setLoginInput({
        ...loginInput,[name]:value
     })
  };

  const handleLoginOnSubmit = (e) => {
      e.preventDefault();
      console.log(loginInput)
  };



  return (
    <div className="flex items-center w-full justify-center">
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="singup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="singup">
        <Card>
          <CardHeader>
            <CardTitle>Sinup</CardTitle>
            <CardDescription>
             Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>

            <form onSubmit={handleOnSubmit}>
           <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label className="float-left mb-3" htmlFor="name">Name</Label>
              <Input type="text" name="name" value={signupInput.name} onChange={singupHndlechange} />
            </div>
            <div className="space-y-1">
              <Label className="float-left mb-3" htmlFor="email">email</Label>
              <Input type="email" name="email" value={signupInput.email} onChange={singupHndlechange}  />
            </div>
            <div className="space-y-1">
              <Label className="float-left mb-3" htmlFor="password">Password</Label>
              <Input type="password" name="password" value={signupInput.password} onChange={singupHndlechange}  placeholder="*********" />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit">Signup</Button>
          </CardFooter>
            </form>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login your password here. After signup,you'll be logged in.
            </CardDescription>
          </CardHeader>
           <form onSubmit={handleLoginOnSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label className="float-left mb-3" htmlFor="email">Email</Label>
              <Input type="email" name="email" value={loginInput.email} onChange={loginHndlechange} id="email" required="true"/>
            </div>
            <div className="space-y-1">
              <Label className="float-left mb-3" htmlFor="new">Password</Label>
              <Input id="new" name="password" value={loginInput.password} onChange={loginHndlechange} type="password" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Login