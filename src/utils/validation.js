export const validateSignup = (data) => {
  const errors = {};
  let { username, email, password, confirmPassword } = data;

  username = username.trim();

const usernameRegex = /^[A-Za-z0-9_-]+$/;

  if (!username) {
    errors.username = "Username is required";
  } else if (/\s/.test(username)) {
    errors.username = "Username must not contain spaces";
  } else if (!usernameRegex.test(username)) {
    errors.username = "allowed characters:[underscore , - ]";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }

  if (!email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateProfileInfo = (data) => {
  const errors = {};
  let { firstName, lastName, bio, avatar } = data;

   const nameRegex = /^[A-Za-z]+$/;
  firstName = firstName?.trim();
  if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (!nameRegex.test(firstName)) {
    errors.firstName = "First name must contain only letters";
  }

  const lastnameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  lastName = lastName?.trim();
  if (lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }else if (!lastnameRegex.test(lastName)) {
    errors.lastName = "Last name must contain only letters";
  }

  if (bio && bio.length > 160) {
    errors.bio = "Bio must be 160 characters or less";
  }

  if (avatar && avatar.type && !avatar.type.startsWith("image/")) {
    errors.avatar = "Only image files are allowed";
  }

  return errors;
};

export function validateLoginInfo({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
    errors.email = 'invalid email format';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
}


export function validatePostInfo({ title, description, images }, singleField = false) {
  const errors = {};

  if (!singleField || 'title' in { title }) {
    if (!title?.trim()) errors.title = 'Title is required';
  }

  if (!singleField || 'description' in { description }) {
    if (!description?.trim()) errors.description = 'Description is required';
  }

  if (!singleField || images !== undefined) {
    if (!images || images.length === 0) {
      errors.images = 'At least one image is required.';
    }
  }

  return errors;
}

