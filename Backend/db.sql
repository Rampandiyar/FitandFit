-- Create the 'scheme' table for gym membership schemes
CREATE TABLE IF NOT EXISTS scheme (
  scheme_id INT AUTO_INCREMENT PRIMARY KEY,  
  scheme_name VARCHAR(50) NOT NULL,          
  price DECIMAL(10, 2) NOT NULL             
);

INSERT INTO scheme (scheme_name, price) VALUES
('Monthly Plan', 29.99),
('Yearly Plan', 49.99);
-- Create the 'member' table for gym members
CREATE TABLE IF NOT EXISTS member (
  member_id INT AUTO_INCREMENT PRIMARY KEY,  
  name VARCHAR(100) NOT NULL,                
  age INT NOT NULL,                          
  dob DATE NOT NULL,                         
  phone_no VARCHAR(15),                      
  email VARCHAR(100) UNIQUE NOT NULL,        
  joining_date DATE NOT NULL, 
  role VARCHAR(20) DEFAULT 'member',               
  scheme_id INT,                             
  FOREIGN KEY (scheme_id) REFERENCES scheme(scheme_id) 
);

-- Create the 'user' table
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    phone_no VARCHAR(15), 
    role VARCHAR(20) DEFAULT 'admin', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
