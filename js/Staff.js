function STAFF(name,id,position,email,phone,dob,workingday,salary,bonus) {
    this.Name = name;
    this.Id = id;
    this.Position = position;
    this.Email = email;
    this.Phone = phone;
    this.DoB = dob;    
    this.WorkingDay = workingday;
    this.Salary = salary;
    this.Bonus = bonus;

    this.paySalary = function () {
        return (parseFloat((this.Salary * this.WorkingDay)) + parseFloat(this.Bonus));
    }
}