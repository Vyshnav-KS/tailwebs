require "test_helper"

class Api::StudentControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_student_index_url
    assert_response :success
  end

  test "should get create" do
    get api_student_create_url
    assert_response :success
  end

  test "should get update" do
    get api_student_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_student_destroy_url
    assert_response :success
  end
end
