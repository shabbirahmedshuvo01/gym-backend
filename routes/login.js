router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  