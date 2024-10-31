module StudentHelper
    def add_or_update_student(name, subject, marks)
      student = Student.find_by(name: name, subject: subject)
      if student
        student.marks = marks
        student.save
      else
        student = Student.create(name: name, subject: subject, marks: marks)
      end
    student
    end
  
  end
  