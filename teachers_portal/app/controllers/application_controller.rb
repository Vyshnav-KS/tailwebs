class ApplicationController < ActionController::API
    before_action :authorized

    def authorized
        render json: {error: "Please login first"}, status: :unauthorized unless logged_in_user
    end

    def logged_in_user
        @logged_in_user ||= Teacher.find_by(id: decode_token['user_id']) if decode_token
    end

    def decode_token
        if auth_header
            token = auth_header.split(' ')[1]
            # JWT.decode(token, ENV['JWT_SECRET']).first
            begin
                JWT.decode(token, 'abcd_1234').first
            rescue JWT::DecodeError
                nil
            end
        end
    end


    def auth_header
        request.headers['Authorization']
    end
end
