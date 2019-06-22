# Require the bundler gem and then call Bundler.require to load in all gems
# listed in Gemfile.
require 'bundler'
Bundler.require

require 'sinatra'
require 'ethereum'

before do
  content_type 'application/json'
end

class Contract
  def initialize
    @client = Ethereum::HttpClient.new("https://ropsten.infura.io/v3/ebcc6fb682fd49a589e84d8a2360cbf0")
    contract_json = JSON.parse(File.read('LinkShortner.json'))
    @contract_abi = contract_json['abi']
    @address = contract_json["networks"]["3"]["address"]
    @client.default_account = "0x3b8B0b23C4850FA8289da815a6abEE4Fc2DF941A"
  end

  def result(id)
    return nil unless id
    contract_instance.call.get_link(id.to_i)[1]
  end

  def contract_instance
    Ethereum::Contract.create(name: "LinkShortner", address: @address, abi: @contract_abi,
                              client: @client)
  end
end
class App < Sinatra::Base
  get '/url' do
    return {url: Contract.new.result(params[:id])}.to_json
  end
end
