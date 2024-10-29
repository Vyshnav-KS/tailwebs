class Api::StudentsController < ApplicationController
  before_action :authorized
  
  include StudentHelper  # Include the helper module

  def index
    @students = Student.all

    if @students
      render json: @students
    else
      render json: { error: 'No students found' }, status: :not_found
    end
  end

  def create
    student = add_or_update_student(student_params[:name], student_params[:subject], student_params[:marks].to_i)
    # student = add_or_update_student(student_params)
    if student.persisted?
      render json: student, status: :created
    else
      render json: student.errors, status: :unprocessable_entity
    end
  end

  def update
    student = Student.find(params[:id])
    if student.update(student_params)
      render json: student
    else
      render json: student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    student = Student.find(params[:id])
    student.destroy
    head :no_content
  end

  private

  def student_params
    params.require(:student).permit(:name, :subject, :marks)
  end
end
