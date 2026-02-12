// Elephant 6 Recording Company Discography Data
// Source: Wikipedia, Discogs

export interface E6Release {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  format?: string;
  imageUrl?: string;
}

// Image URLs from Discogs / Wikipedia
export const e6ReleaseImages: Record<number, string> = {
  1: "https://i.discogs.com/5q2cIMR0fIH-ywZlhGU1YjS0S-y-xXKBfYVhLsXBWZQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0Nzkz/LTEzMDIyODE5NjMu/anBlZw.jpeg",
  2: "https://i.discogs.com/M60Pv3lEjGhSvlMqz8AEYv_EX7TyXq0fmb6Dj1F23MY/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MzE4/MTUtMTIxNTk1NjI2/Ny5qcGVn.jpeg",
  3: "https://i.discogs.com/7_8RFNTpR4Dl_LYl8qEwD5Dg0flYQKLjZi4R4tJN0ZE/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwNzk2/Ny0xNDM1NTI3MjAx/LTc1MjkuanBlZw.jpeg",
  4: "https://i.discogs.com/m0GFtfvPZBM8o8GbbJHKpKZq3tZaxrXF4S3H2R_yCkw/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUzOTAz/NC0xMjY2NDIwNDcx/LmpwZWc.jpeg",
  5: "https://i.discogs.com/pC3z3rdCE5m0jL7qUV5YK7pQmDWUMX1sL6_iJ3gYYmc/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwNTM3/MS0xMzM4OTg3Njkz/LmpwZWc.jpeg",
  6: "https://i.discogs.com/bYhJo7nLzZNIJH5lVKv4SuZ38LZ7a1JmXQw-RJr7sF0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MjI4/MjAtMTI0MTQxODk3/Ni5qcGVn.jpeg",
  7: "https://i.discogs.com/OcjXc0VVCrxz6BK_r5T0YsmqQs5FJp0RhSfDQpJH2oQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTA4/MjItMTE5NTIyMjg4/MS5qcGVn.jpeg",
  8: "https://i.discogs.com/YbP5r_sHKzh0TRjP-6bS4Oq-IH9_Ds5RYVFr3MdfsPg/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMwNDIy/MzctMTMxMjUyNjM4/MS5qcGVn.jpeg",
  9: "https://i.discogs.com/_VN1T1dV-7ZfLV7fKq8T5bJYqSu_x3Fg0axDY7pDRjQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMjk4/MDctMTI4NjMzMDYz/OC5qcGVn.jpeg",
  10: "https://i.discogs.com/wQ5sqE1I-Z4GdlMFj8mXSqFyV2_Jq2tVkGLTjWs4C1A/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUzOTkz/NC0xNDI0MTQxMjk2/LTIyNTguanBlZw.jpeg",
  11: "https://i.discogs.com/Gt-kKJGhSyUhVIrz22nJLXflQ5ynVaXqJZ5KeVr9Pqk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNzIz/MDItMTIwMTY3NjM4/NC5qcGVn.jpeg",
  12: "https://i.discogs.com/KF6qJ_7RDVRv4pG8fNxJ9L_GhZp2d0qS-1zIe1FCj8g/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NjU3/NjQtMTI0OTcxOTI3/NC5qcGVn.jpeg",
  13: "https://i.discogs.com/L0qh7bQp4u_6_nLyxJjP6J9xGVYrKULnVtlF6c7xDjE/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYzMDU5/MS0xNDg5NDQ0Njg5/LTg2MTIuanBlZw.jpeg",
  14: "https://i.discogs.com/oVhKHGqKSjJ3LLKcrQ_uVqOQ9e3TYQF5nY2K5IjP_6o/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNjEz/MDMtMTM1NDkyMjk0/MS05ODYzLmpwZWc.jpeg",
  15: "https://i.discogs.com/QKA0hPVVWZg8TqPjFJ1WQnVxJg1rZxWXVz7V4h9DVTM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNTY4/ODctMTIxODA5NjMy/MC5qcGVn.jpeg",
  16: "https://i.discogs.com/6_8gT3JG6DJy3p0LRUzZ7s6bJLhU6SzUKKVEKfMfVrk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY2NjY1/MC0xMjE3NjI5Mzg3/LmpwZWc.jpeg",
  17: "https://i.discogs.com/iNnYr2VvGYBE2lMYU1mFYJZHQWIvswvChz5CdVxqD7o/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwODM3/OS0xMjcyMTMwNzQ4/LmpwZWc.jpeg",
  18: "https://i.discogs.com/5f5Y7GVFzQ3kVVv_2pYxNmrF8X0NNbQlOQzAkSWiPJ4/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY4NDcw/My0xMTY5NTE4NDYz/LmpwZWc.jpeg",
  19: "https://i.discogs.com/KXLQKpZ7e7f5V_WA7rWzJvS3QFWQ4xNqP8jP6ggECk8/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4MDY0/Ny0xMzQyMTM4NzYx/LTQyMjguanBlZw.jpeg",
  20: "https://i.discogs.com/dGKz3o_fCEjOE4g1KHlJ5p1Kbqu6_F7qV5Oi5aF5D8g/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyMDM2/Ny0xMzM4MDQ3MjI4/LmpwZWc.jpeg",
  21: "https://i.discogs.com/Ub8Xv-5IRKcVvOvN5oOkNqYK8Y4Y7qfz6hZ7yU0MUUU/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMxNjkz/Mi0xMjg4MDc4ODM5/LmpwZWc.jpeg",
  22: "https://i.discogs.com/pnvJg3HVV4FdX6kENg3q_rK3C5S2Y3nOJLNZ3WiZqwY/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMyMTA4/Mi0xMzg4ODI1NTg5/LTUzMjYuanBlZw.jpeg",
  23: "https://i.discogs.com/ZIk5U1cZKLIo2CVZs9DqMdSMiR0EGVw7rKqnFJTaVBo/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNDg3/NjMtMTI4NDczNDA2/NS5qcGVn.jpeg",
  24: "https://i.discogs.com/g6k-bTRLRm2LGz_DWJ1x5lNxb-HW4z3g_UHN4bqt-LQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcxMjI3/NS0xMjk4NTg5MjU3/LmpwZWc.jpeg",
  25: "https://i.discogs.com/kMKZ8C_7G-q-LOl0KeMZMkZkJQD5rTDvP6xDiERLBcw/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyOTk1/Ny0xMjc5NjYyNTA2/LmpwZWc.jpeg",
  26: "https://i.discogs.com/qJvB2yT4bqZ7q56w7dVAOKXJB9kS3s-0WfVBJR5H7xE/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2Mzk5/NzEtMTIzNDA3NTI3/OC5qcGVn.jpeg",
  27: "https://i.discogs.com/nVHtJkXjHPhZOK0_VxhVQk3F3I2J-4FQKR8v7z4tbbk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMDA3/NzItMTI4OTg1MzA3/NC5qcGVn.jpeg",
  28: "https://i.discogs.com/TQr5Vc_3xBdXjzQYKJhxqWD8qV9D2-ZxDpZKmqvwZFU/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcxMjkz/NC0xMTY2MTEyODEz/LmpwZWc.jpeg",
  29: "https://i.discogs.com/o7s8CQ05h6t6yCkPeJkJdLJPEk6BQV07K8G9PFjsGtQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTc0/OTUtMTIwNTA4NjQ4/Ny5qcGVn.jpeg",
  30: "https://i.discogs.com/j_W4dqxjA-5S-TrQYqR_xdJaLrr5n3lG1FQlFCcDlEQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5NDYx/NjQtMTI1NjcyMTg3/NS5qcGVn.jpeg",
  31: "https://i.discogs.com/NLe5y1c7kANV5q3_L2VEQqb5O8Y5mPJl5PJWrfVMprU/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwMTA4/OC0xMjc1NDUyOTI3/LmpwZWc.jpeg",
  32: "https://i.discogs.com/e8rJbvxPg4O8QhI9VxiIh_VXkTfQ59SMr8e5rVEFCTQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwNzQ0/NS0xNDg5MzUxOTI1/LTg5MTUuanBlZw.jpeg",
  33: "https://i.discogs.com/6x9gNE5P8yTSG9vUt5TpVjKnJp5h1bQ4U9EqnGjCjwA/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU5Mzk3/Mi0xNDI4MDI2MjI3/LTIxMzQuanBlZw.jpeg",
  34: "https://i.discogs.com/3sYVlKP6u9V1RvmG2y1r8FZ0K7lPvwMHi2xRkWVhCWE/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NjQ2/NjMtMTMwMjMwOTY3/OS5qcGVn.jpeg",
  35: "https://i.discogs.com/nHqBdPf2kJfV2J5LJVm2vqbPnqDklMl0h8YhY5APDX8/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc0Mzgw/MS0xMTcyOTU3Njc4/LmpwZWc.jpeg",
  36: "https://i.discogs.com/q3DmrJbQ0QHPOxVf6_0dMOL4VFKKfDr7_tP7vLgLH3s/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDkx/MTUtMTE5NjQwMDQx/My5qcGVn.jpeg",
  37: "https://i.discogs.com/5Bpq4OkA8qfT3_6KN4g8jOvKRdFx6nOLzlP0GFXHJ6I/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwNjI5/Ny0xMzI0NjI3Mjk5/LmpwZWc.jpeg",
  38: "https://i.discogs.com/E5H3y6rR7z6MoTq8q_pGmPdbQrRxOL8l-6Rkt3m0w4g/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU0Mjg4/OS0xNDI0MDg4MDM5/LTEwMzIuanBlZw.jpeg",
  39: "https://i.discogs.com/dK5X_3FoiR1xGIKF8hF2x_PBbGV3OPqXQ_xSe0X2rJY/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2Mjgw/NC0xNDg5NDQ3ODg0/LTc0OTIuanBlZw.jpeg",
  40: "https://i.discogs.com/R7J2QZaFDhyH4d_n2_wYfkFsj6h4fKUEoJWxh5wHXog/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4Nzkz/NDMtMTMwMzEyMzg4/MC5qcGVn.jpeg",
  41: "https://i.discogs.com/Jk0D8bKMJYVLJC5QkFWpJWGJR8eC9J6FQZE7xVQzk0g/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMwNDk4/ODQtMTMxMjc1NjI2/My5qcGVn.jpeg",
  42: "https://i.discogs.com/FWkP7yL4nxIbGpPaS7LqDlTnfQh_A8F0i-K7eGBkpO4/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5NDk5/MC0xMTI2OTc2OTQ3/LmpwZWc.jpeg",
  43: "https://i.discogs.com/F6ZAeP2nFHT0RxVIoRHMxH6bQKs_d6DaVq6hL5_5J5I/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMDc2/NjYtMTQ4NjM1NjMx/Ni03MDQ5LmpwZWc.jpeg",
  44: "https://i.discogs.com/UQPSNLz7hJI1u5HRVbTh_u3Dc9QdQZQFZlV2lLFJ0q0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTMz/MTgtMTIwNjA3MDc5/Ny5qcGVn.jpeg",
  45: "https://i.discogs.com/ZKDdGR7GfT5JqV3oYJ-bxn3RB_kUoKGfJt3aIqNS1Eg/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NTM4/MTItMTI0MjY3NjE0/MS5qcGVn.jpeg",
  46: "https://i.discogs.com/bE6TrV_8h9YPV3rq7rJ5uINOLkMxqUJjRrExjNpDcko/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDky/NjctMTUwNjczMzUy/Ni05NjA2LmpwZWc.jpeg",
  47: "https://i.discogs.com/1q3oEvFTx0Vg1Dqz8RGD8-uBpD7FQHQY8AqGtKJnuKE/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgzOTk3/NS0xMTcyMjQ5Nzc2/LmpwZWc.jpeg",
  48: "https://i.discogs.com/xN3bVi8tPpjqEVMaWHl2Ctp8rGKqXmQ7D7X5KiHxStQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMDk1/NTctMTM4ODgxMzQ0/NS0xMzU3LmpwZWc.jpeg",
  49: "https://i.discogs.com/7_l3oLqA0YhDm8ePLdE3bJcFpR1pf4mD-kqjx9kShDQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMDU1/NDctMTQ5MDQxMjcy/Mi03NjAxLmpwZWc.jpeg",
  50: "https://i.discogs.com/2Pj5r1_-z4OG3YKwz5TXhXr9w_kPbJlE7FQGQ5rZLJQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMxNjky/MC0xMjM0OTAyNTQz/LmpwZWc.jpeg",
};

// Get image URL for a release
export function getE6ReleaseImageUrl(catalogNumber: number): string | undefined {
  return e6ReleaseImages[catalogNumber];
}

export const e6Discography: E6Release[] = [
  { catalogNumber: 1, artist: "Neutral Milk Hotel", title: "On Avery Island", year: 1996 },
  { catalogNumber: 2, artist: "Neutral Milk Hotel", title: "In the Aeroplane Over the Sea", year: 1998 },
  { catalogNumber: 3, artist: "The Olivia Tremor Control", title: "Music from the Unrealized Film Script, Dusk at Cubist Castle", year: 1996 },
  { catalogNumber: 4, artist: "The Olivia Tremor Control", title: "Black Foliage: Animation Music Volume One", year: 1999 },
  { catalogNumber: 5, artist: "The Apples in Stereo", title: "Fun Trick Noisemaker", year: 1995 },
  { catalogNumber: 6, artist: "The Apples in Stereo", title: "Tone Soul Evolution", year: 1997 },
  { catalogNumber: 7, artist: "The Apples in Stereo", title: "The Discovery of a World Inside the Moone", year: 2000 },
  { catalogNumber: 8, artist: "The Apples in Stereo", title: "Her Wallpaper Reverie", year: 1999 },
  { catalogNumber: 9, artist: "of Montreal", title: "Cherry Peel", year: 1997 },
  { catalogNumber: 10, artist: "of Montreal", title: "The Bedside Drama: A Petite Tragedy", year: 1998 },
  { catalogNumber: 11, artist: "of Montreal", title: "The Gay Parade", year: 1999 },
  { catalogNumber: 12, artist: "of Montreal", title: "Coquelicot Asleep in the Poppies: A Variety of Whimsical Verse", year: 2001 },
  { catalogNumber: 13, artist: "of Montreal", title: "Aldhils Arboretum", year: 2002 },
  { catalogNumber: 14, artist: "of Montreal", title: "Satanic Panic in the Attic", year: 2004 },
  { catalogNumber: 15, artist: "of Montreal", title: "The Sunlandic Twins", year: 2005 },
  { catalogNumber: 16, artist: "of Montreal", title: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { catalogNumber: 17, artist: "Elf Power", title: "Vainly Clutching at Phantom Limbs", year: 1995 },
  { catalogNumber: 18, artist: "Elf Power", title: "When the Red King Comes", year: 1997 },
  { catalogNumber: 19, artist: "Elf Power", title: "A Dream in Sound", year: 1999 },
  { catalogNumber: 20, artist: "Elf Power", title: "The Winter Is Coming", year: 2000 },
  { catalogNumber: 21, artist: "Elf Power", title: "Creatures", year: 2001 },
  { catalogNumber: 22, artist: "The Music Tapes", title: "First Imaginary Symphony for Nomad", year: 1999 },
  { catalogNumber: 23, artist: "The Music Tapes", title: "Music Tapes for Clouds and Tornadoes", year: 2008 },
  { catalogNumber: 24, artist: "Circulatory System", title: "Circulatory System", year: 2001 },
  { catalogNumber: 25, artist: "Circulatory System", title: "Signal Morning", year: 2009 },
  { catalogNumber: 26, artist: "Beulah", title: "Handsome Western States", year: 1997 },
  { catalogNumber: 27, artist: "Beulah", title: "When Your Heartstrings Break", year: 1999 },
  { catalogNumber: 28, artist: "Beulah", title: "The Coast Is Never Clear", year: 2001 },
  { catalogNumber: 29, artist: "Dressy Bessy", title: "Pink Hearts Yellow Moons", year: 1999 },
  { catalogNumber: 30, artist: "Dressy Bessy", title: "Sound Go Round", year: 2002 },
  { catalogNumber: 31, artist: "The Gerbils", title: "Are You Sleepy?", year: 1997 },
  { catalogNumber: 32, artist: "Pipes You See, Pipes You Don't", title: "Caution: Free Music Inside", year: 1996 },
  { catalogNumber: 33, artist: "Chocolate USA", title: "All Jets Are Gonna Fall Today", year: 1994 },
  { catalogNumber: 34, artist: "Major Organ and the Adding Machine", title: "Major Organ and the Adding Machine", year: 2001 },
  { catalogNumber: 35, artist: "Marshmallow Coast", title: "Ride the Lightning", year: 2003 },
  { catalogNumber: 36, artist: "Great Lakes", title: "Great Lakes", year: 1997 },
  { catalogNumber: 37, artist: "Japancakes", title: "The Sleepy Strange", year: 2001 },
  { catalogNumber: 38, artist: "Japancakes", title: "If I Could See Dallas", year: 2003 },
  { catalogNumber: 39, artist: "Nana Grizol", title: "Love It Love It", year: 2008 },
  { catalogNumber: 40, artist: "Nana Grizol", title: "Ruth", year: 2010 },
  { catalogNumber: 41, artist: "The Sunshine Fix", title: "Age of the Sun", year: 2001 },
  { catalogNumber: 42, artist: "The Minders", title: "Hooray for Tuesday", year: 1998 },
  { catalogNumber: 43, artist: "Essex Green", title: "Everything Is Green", year: 1999 },
  { catalogNumber: 44, artist: "Essex Green", title: "The Long Goodbye", year: 2003 },
  { catalogNumber: 45, artist: "Neutral Milk Hotel", title: "Everything Is", year: 1994 },
  { catalogNumber: 46, artist: "Half-Handed Cloud", title: "Thy Is a Word & Feet Need Lamps", year: 2002 },
  { catalogNumber: 47, artist: "The Apples in Stereo", title: "New Magnetic Wonder", year: 2007 },
  { catalogNumber: 48, artist: "of Montreal", title: "Skeletal Lamping", year: 2008 },
  { catalogNumber: 49, artist: "Elf Power", title: "Back to the Web", year: 2006 },
  { catalogNumber: 50, artist: "Dressy Bessy", title: "Electrified", year: 2005 },
];

// Get all releases
export function getAllE6Releases(): E6Release[] {
  return e6Discography;
}

// Get releases by year
export function getE6ReleasesByYear(year: number): E6Release[] {
  return e6Discography.filter((r) => r.year === year);
}

// Get release by catalog number
export function getE6ReleaseByCatalogNumber(num: number): E6Release | undefined {
  return e6Discography.find((r) => r.catalogNumber === num);
}

// Get unique years
export function getE6ReleaseYears(): number[] {
  return [...new Set(e6Discography.map((r) => r.year))].sort((a, b) => a - b);
}

// Get unique artists
export function getE6Artists(): string[] {
  return [...new Set(e6Discography.map((r) => r.artist))].sort();
}

// Get releases by artist
export function getE6ReleasesByArtist(artist: string): E6Release[] {
  return e6Discography.filter((r) => r.artist.toLowerCase().includes(artist.toLowerCase()));
}
